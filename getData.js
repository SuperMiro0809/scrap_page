const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
    async getData(url) {
        let result = [];
        let pages = [];

        async function checkPage() {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const pageEl = $('div.box-pagination.padding-top-half ul li.active');

            if (pages.includes(pageEl.text().trim())) {
                return false;
            } else {
                pages.push(pageEl.text().trim());
                return true;
            }
        }

        async function getPage() {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const pageEl = $('div.box-pagination.padding-top-half ul li.active');
            let urlArr = url.split('/');

            //Number(pageEl.text().trim()) < Number(urlArr[4].split('-')[1])
            // console.log(pages);
            if (!pageEl.text().trim()) {
                url = '';
            } else {
                let page = `s-${pageEl.text().trim()}`;

                if (urlArr[4].includes(`s-`)) {
                    urlArr.splice(4, 1, `${page}`);
                } else {
                    urlArr.splice(4, 0, `${page}`);
                }
                url = urlArr.join('/');
                //console.log(url);
                //url = `https://www.business.bg/o-341/s-${pageEl.text().trim()}/avtoservizi/c-214/sofia.html`;
            }
        }

        async function getData() {
            let res = await checkPage();

            if (res) {
                const { data } = await axios.get(url);
                const $ = cheerio.load(data);
                const pageEl = $('div.box-firm-small');

                pageEl.each(function (i, el) {
                    const firm = cheerio.load(el);
                    const firmTitle = firm('div.firm_content > div.row > div.col-sm-8 > h2');
                    const firmContact = firm('div.firm_content > div.row > div.col-sm-4.firm_contact');
                    const firmTel = firm('div.firm_content > div.firm_link > div > div.tel_b > a');
                    const firmMail = firm('div.firm_content > div.firm_link > div > div.mail_b > a');
                    const firmUrl = firm('div.firm_content > div.firm_link > div > div.url_b > a');

                    let firmObj = {
                        title: firmTitle.text().trim(),
                        contact: firmContact.text().trim(),
                        tel: firmTel.text().trim(),
                        mail: firmMail.text().trim(),
                        url: firmUrl.text().trim()
                    };

                    result.push(firmObj);
                })

                await getPage();
            }else {
                url = '';
            }
        }

        while (url) {
            console.log(url);
            await getData();
        }

        return result;
    }
}
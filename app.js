(async function () {
    const { exportToExcel } = require('./exportToExcel.js');
    const { getData } = require('./getData.js');

    let auto = await getData('https://www.business.bg/o-341/avtoservizi/c-214/sofia.html');

    let print = await getData('https://www.business.bg/o-381/pechatnici/c-214/sofia.html');

    let box = await getData('https://www.business.bg/o-595/kashoni/c-214/sofia.html');

    let books = await getData('https://www.business.bg/o-782/knigi/c-214/sofia.html');
    
    let paper = await getData('https://www.business.bg/o-594/opakovychna-hartia/c-214/sofia.html');

    let sofiaBuisnesses = await getData('https://www.business.bg/c-214/sofia.html');

    // let url = 'https://www.business.bg/o-341/avtoservizi/c-214/sofia.html';
    // let result = [];

    // async function getPage() {
    //     const { data } = await axios.get(url);
    //     const $ = cheerio.load(data);
    //     const pageEl = $('div.box-pagination.padding-top-half ul li.active');

    //     if(!pageEl.text().trim()) {
    //         url = '';
    //     }else {
    //         url = `https://www.business.bg/o-341/s-${pageEl.text().trim()}/avtoservizi/c-214/sofia.html`;
    //     }
    // }

    // async function getData() {
    //     const { data } = await axios.get(url);
    //     const $ = cheerio.load(data);
    //     const pageEl = $('div.box-firm-small');

    //     pageEl.each(function (i, el) {
    //         const firm = cheerio.load(el);
    //         const firmTitle = firm('div.firm_content > div.row > div.col-sm-8 > h2');
    //         const firmContact = firm('div.firm_content > div.row > div.col-sm-4.firm_contact');
    //         const firmTel = firm('div.firm_content > div.firm_link > div > div.tel_b > a');
    //         const firmMail = firm('div.firm_content > div.firm_link > div > div.mail_b > a');
    //         const firmUrl = firm('div.firm_content > div.firm_link > div > div.url_b > a');

    //         let firmObj = {
    //             title: firmTitle.text().trim(),
    //             contact: firmContact.text().trim(),
    //             tel: firmTel.text().trim(),
    //             mail: firmMail.text().trim(),
    //             url: firmUrl.text().trim()
    //         };
            
    //         result.push(firmObj);
    //     })

    //     await getPage();
    // }

    // while(url) {
    //     await getData();
    // }
    let data = [ auto, print, box, books, paper, sofiaBuisnesses ];
    exportToExcel(data);
}())

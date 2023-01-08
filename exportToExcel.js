const xl = require('excel4node');

function addToSheet(data, sheet, style) {
    for(let i = 0; i < data.length; i++) {
        sheet.cell(1 + i + 1, 1)
        .string(data[i].title)
        .style(style);

        sheet.cell(1 + i + 1, 2)
        .string(data[i].contact)
        .style(style);

        sheet.cell(1 + i + 1, 3)
        .string(data[i].tel)
        .style(style);

        sheet.cell(1 + i + 1, 4)
        .string(data[i].mail)
        .style(style);

        sheet.cell(1 + i + 1, 5)
        .string(data[i].url)
        .style(style);
    }

}

module.exports = {
    exportToExcel(input) {
        const wb = new xl.Workbook();
        const autoWs = wb.addWorksheet('Автосервизи');
        const printWs = wb.addWorksheet('Печатници');
        const boxWs = wb.addWorksheet('Кашони');
        const booksWs = wb.addWorksheet('Книги');
        const paperWs = wb.addWorksheet('Опаковъчна хартия');
        const sofiaBuisnessesWs = wb.addWorksheet('Бизнеси в София');

        let sheetArray = [ autoWs, printWs, boxWs, booksWs, paperWs, sofiaBuisnessesWs ];

        const style = wb.createStyle({
            font: {
              color: '#000000',
              size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        });

        for(let i = 0; i < sheetArray.length; i++) {
            sheetArray[i].column(1).setWidth(30)
            sheetArray[i].column(2).setWidth(30)
            sheetArray[i].column(3).setWidth(30)
            sheetArray[i].column(4).setWidth(30)
            sheetArray[i].column(5).setWidth(30)
    
            sheetArray[i].cell(1, 1)
            .string('Име')
            .style(style);
    
            sheetArray[i].cell(1, 2)
            .string('Град')
            .style(style);
    
            sheetArray[i].cell(1, 3)
            .string('Телефон')
            .style(style);
    
            sheetArray[i].cell(1, 4)
            .string('Имейл')
            .style(style);
    
            sheetArray[i].cell(1, 5)
            .string('Сайт')
            .style(style);

            addToSheet(input[i], sheetArray[i], style);
        }

        
        wb.write(`data_${Date.now()}.xlsx`);
    },
}
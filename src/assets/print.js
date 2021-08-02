// function PrintDeliveryNumberLabel() {
//     debugger;
//     deliveryNumber='', dentist='', dealer='', patient='', url='http://global.dymo.com', count=''
//     try {
//         $.get(url, function (labelXml) {
//             var label = window.dymo.label.framework.openLabelXml(labelXml);
//             var labelSet = new window.dymo.label.framework.LabelSetBuilder();
             
//             for (var i = 0; i < count; i++) {
//                 var record = labelSet.addRecord();
//                 record.setText("Label_DeliveryNumber", deliveryNumber);
//                 record.setText("BarCode_DeliveryNumber", deliveryNumber);
//                 record.setText("Label_Dentist", dentist);
//                 record.setText("Label_Dealer", dealer);
//                 record.setText("Label_Patient", patient);
//             }

//             var printerName = GetDymoPrinters();

//             // finally print the label
//             label.print(printerName, '', labelSet);
//         }, "text");
//     }
//     catch (e) {
//         alert(e.message || e);
//     }
// }



function GetDymoPrinters() {
    
    var printers = window.dymo.label.framework.getPrinters();
    if (printers.length == 0)
        throw "No DYMO printers are installed. Install DYMO printers. \n\nhttp://global.dymo.com";

    var printerName = "";
    for (var i = 0; i < printers.length; ++i) {
        var printer = printers[i];
        if (printer.printerType == "LabelWriterPrinter") {
            printerName = printer.name;
            break;
        }
    }

    if (printerName == "")
        throw "No LabelWriter printers found. Install LabelWriter printer";

    return printerName;
}

// var SendToDymo = function(data, template, fnCallback) {

//     try {

//         var printerName = GetDymoPrinters();

//         $.get(template, "", "text").done(function(labelXml) {
            
//             var label = window.dymo.label.framework.openLabelXml(labelXml);
//             var labelSet = new window.dymo.label.framework.LabelSetBuilder();
//             var logoBaseUrl = dentApp.common.getProperty('dealerLogoBaseUrl');

//             var currentDealerLogo;

//             var flags = {}, prevLogos = {};
//             var uniqueDealers = data.filter(function(entry) {
//                 if (flags[entry.Dealer.Id]) {
//                     return false;
//                 }
//                 flags[entry.Dealer.Id] = true;
//                 return true;
//             }).map(function(itm) {
//                 currentDealerLogo = itm.Dealer.Logo ? itm.Dealer.Logo : 'defaultLogo3.jpg';

//                 if (!prevLogos[currentDealerLogo])
//                        prevLogos[currentDealerLogo] = window.dymo.label.framework.loadImageAsPngBase64(logoBaseUrl + currentDealerLogo);

//                     return {
//                         dealerId: itm.Dealer.Id,
//                         logoBase64: prevLogos[currentDealerLogo]
//                     };
//             });

//             for (var j = 0; j < data.length; j++) {

//                 var record = labelSet.addRecord();

//                 record.setText("BarCode", data[j].Dentist.CompanyNo || '');
//                 record.setText("CompanyName", data[j].Dentist.Group || '');
//                 record.setText("DentistName", data[j].Dentist.Name || '');
//                 record.setText("PostalStreetAddress", data[j].Dentist.Street || '');
//                 record.setText("PostalStreetAddress2", '');
//                 record.setText("DentistPostalAddress", (data[j].Dentist.PostalCode || '') + ' ' + (data[j].Dentist.City || ''));
//                 record.setText("DentistCountry", data[j].Dentist.Country || '');
//                 record.setText("LabelTag", data[j].Dentist.LabelTag || '');

//                 record.setText("CompanyName_Dealer", data[j].Dealer.Name || '');
//                 record.setText("CompanyPostalStreetAddress_Dealer", data[j].Dealer.Street || '');
//                 record.setText("CompanyPostalAddress_Dealer", (data[j].Dealer.PostalCode || '') + ' ' + (data[j].Dealer.City || ''));
//                 record.setText('GRAFIK', ($.grep(uniqueDealers, function(obj) { return obj.dealerId === data[j].Dealer.Id; })[0].logoBase64) || '');

//             }

//             // finally print the label(s)
//                 label.print(printerName, '', labelSet);

//             if (fnCallback && typeof (fnCallback) === "function") {
//                 fnCallback();
//             }
//         });
//     } catch (e) {
//         if (fnCallback && typeof (fnCallback) === "function") {
//             fnCallback();
//         }
//         alert(e.message || e);
//     }


// };


// function PrintDentistLabel(companyNumber, companyGroup, companyName, postalStreetAddress, postalStreetAddress2, dentistPostalAddress, dentistCountry, dentistPhone, url, labelTag, sender) {
//     try {
        
//         var printerName = GetDymoPrinters();
        
//         $.get(url, function (labelXml) {
//             var label = window.dymo.label.framework.openLabelXml(labelXml);
//             var labelSet = new window.dymo.label.framework.LabelSetBuilder();


//             for (var j = 0; j < 1; j++) {

//                 var record = labelSet.addRecord();

//                 record.setText("BarCode", companyNumber);
//                 record.setText("CompanyName", companyGroup || '');
//                 record.setText("DentistName", companyName);
//                 record.setText("PostalStreetAddress", postalStreetAddress);
//                 record.setText("PostalStreetAddress2", postalStreetAddress2);
//                 record.setText("DentistPostalAddress", dentistPostalAddress);
//                 record.setText("DentistCountry", dentistCountry);
//                 record.setText("LabelTag", labelTag);

//                 if (sender !== null && sender !== 'undefined') {
//                     record.setText("CompanyName_Dealer", sender.Name);
//                     record.setText("CompanyPostalStreetAddress_Dealer", sender.Street);
//                     record.setText("CompanyPostalAddress_Dealer", sender.PostalCode + ' ' + sender.City);
//                     //record.setText("CompanyName_dealer", sender.City);
//                     //record.setText("CompanyName_dealer", sender.CountryName);

//                     var logoBaseUrl = dentApp.common.getProperty('dealerLogoBaseUrl');
//                     var logoFileName = sender.LogoFileName || 'defaultLogo3.jpg';
//                     var logoBase64 = window.dymo.label.framework.loadImageAsPngBase64(logoBaseUrl + logoFileName);

//                     record.setText('GRAFIK', logoBase64);
//                 }
//                 else {
//                     record.setText("CompanyName_Dealer", '');
//                     record.setText("CompanyPostalStreetAddress_Dealer", '');
//                     record.setText("CompanyPostalAddress_Dealer", '');
//                 }
//             }

//             // finally print the label
//             label.print(printerName, '', labelSet);
//         }, "text");
//     }
//     catch (e) {
//         alert(e.message || e);
//     }
// };

// function GetLabelTemplateUrl(rootPath, countryName) {

//     if (countryName == null || countryName == '' || countryName == 'undefined')
//         return rootPath + 'Dentist_label.txt';
//     if (countryName == 'USA')
//         return rootPath + 'Dentist_label_US.txt';
//     if (countryName == 'Norway')
//         return rootPath + 'Dentist_label_NO.txt';
//     else
//         return rootPath + 'Dentist_label.txt';
// };

// function loadPrinters()
// {
//     alert(1);
//     var printers = dymo.label.framework.getPrinters();
//     if (printers.length == 0)
//     {
//         alert("No DYMO printers are installed. Install DYMO printers.");
//         return;
//     }

//     for (var i = 0; i < printers.length; i++)
//     {
//         var printerName = printers[i].name;

//         var option = document.createElement('option');
//         option.value = printerName;
//         option.appendChild(document.createTextNode(printerName));
//         printersSelect.appendChild(option);
//     }
// }

// stores loaded label info
// var barcodeLabel;

// called when the document loaded
function onload() {
    var label_text = 'QRCode Text Here..';
    var barcodeLabel;
    // barcodeLabel.setObjectText('Barcode', label_text);

    // // Should Be Printer Name, Dymo 450 Turbo..
    // console.log("print: ", printersSelect.value );

    // barcodeLabel.print( printersSelect.value );
        // Load Labels 
        loadLabelFromWeb();

        // load printers list on startup
        loadPrinters();

    // loads all supported printers into a combo box 




};
function loadPrinters() {
    var printers = dymo.label.framework.getLabelWriterPrinters();
    if (printers.length == 0) {
        alert("No DYMO printers are installed. Install DYMO printers.");
        return;
    }
    console.log("got here: ", printers );

    for (var i = 0; i < printers.length; i++) {
        var printer = printers[i];

        var printerName = printer.name;

        var option = document.createElement('option');
        option.value = printerName;
        option.appendChild(document.createTextNode(printerName));
        printersSelect.appendChild(option);
    }
}

function getBarcodeLabelXml() {

    var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
    <DieCutLabel Version="8.0" Units="twips">\
        <PaperOrientation>Landscape</PaperOrientation>\
        <Id>Address</Id>\
        <PaperName>30252 Address</PaperName>\
        <DrawCommands>\
            <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />\
        </DrawCommands>\
        <ObjectInfo>\
            <TextObject>\
                <Name>Text</Name>\
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                <LinkedObjectName></LinkedObjectName>\
                <Rotation>Rotation0</Rotation>\
                <IsMirrored>False</IsMirrored>\
                <IsVariable>False</IsVariable>\
                <HorizontalAlignment>Left</HorizontalAlignment>\
                <VerticalAlignment>Middle</VerticalAlignment>\
                <TextFitMode>AlwaysFit</TextFitMode>\
                <UseFullFontHeight>True</UseFullFontHeight>\
                <Verticalized>False</Verticalized>\
                <StyledText />\
            </TextObject>\
            <Bounds X="331" Y="57.9999999999999" Width="4622" Height="1435" />\
        </ObjectInfo>\
    </DieCutLabel>';
return labelXml;
}

function loadLabelFromWeb() {
    var barcodeLabel;
    barcodeLabel = dymo.label.framework.openLabelXml( getBarcodeLabelXml() );
}
// Run's Dymo Javascript.. 
//dymo.label.framework.init(onload);

function sidtest(){
    var label = window.dymo.label.framework.openLabelXml(getBarcodeLabelXml);
            var labelSet = new window.dymo.label.framework.LabelSetBuilder();
             
            for (var i = 0; i < 1; i++) {
                var record = labelSet.addRecord();
                record.setText("Label_DeliveryNumber", 123);
                record.setText("BarCode_DeliveryNumber", 123);
                record.setText("Label_Dentist", "dentist");
                record.setText("Label_Dealer", "dealer");
                record.setText("Label_Patient", "patient");
            }

            var printerName = GetDymoPrinters();

            // finally print the label
            label.print(printerName, '', labelSet);
}
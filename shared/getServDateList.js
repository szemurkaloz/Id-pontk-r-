import he from 'he';

export const IDOPONT_LIST = 'GetIdopontList';
export const DATUM_LIST = 'GetDateList';
export const FOGLALAS = 'Foglalas';
export const KERDESEK = 'GetKerdesek';
export const USER_INFO = 'GetUserInfo';

export const getDateListEnvelope = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    xmlns:tns="http://tempuri.org/" 
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
    xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" 
    xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" 
    xmlns:ns1="urn:MMAppointmentIntf" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" >
<SOAP-ENV:Body><mns:GetDateList xmlns:mns="urn:MMAppointmentIntf-IMMAppointment" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<pPassword xsi:type="xs:string">Eh9ET437DBfC</pPassword>
<pId xsi:type="xs:string">KULCSOK</pId>
</mns:GetDateList></SOAP-ENV:Body></SOAP-ENV:Envelope>`;

export const getTimeListEnvelop = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" 
    xmlns:ns1="urn:MMAppointmentIntf" 
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
    xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" 
    xmlns:tns="http://tempuri.org/" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <SOAP-ENV:Body>
      <mns:GetTimeList xmlns:mns="urn:MMAppointmentIntf-IMMAppointment" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <pPassword xsi:type="xs:string" >Eh9ET437DBfC</pPassword>
         <pId xsi:type="xs:string" >KULCSOK</pId>
         <pDate xsi:type="xs:dateTime" >FOGLALASDATUMA</pDate>
      </mns:GetTimeList>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

export const getKerdesekEnvelop = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<SOAP-ENV:Envelope
	xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:tns="http://tempuri.org/"
	xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
	xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"
	xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/"
	xmlns:ns1="urn:MMAppointmentIntf"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema" >
	<SOAP-ENV:Body>
		<mns:GetKerdesek
			xmlns:mns="urn:MMAppointmentIntf-IMMAppointment" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
			<pPassword xsi:type="xs:string">Eh9ET437DBfC</pPassword>
			<pId xsi:type="xs:string">KULCSOK</pId>
		</mns:GetKerdesek>
	</SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

export const getFoglalasEnvelop = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<SOAP-ENV:Envelope
	xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:tns="http://tempuri.org/"
	xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
	xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"
	xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/"
	xmlns:ns1="urn:MMAppointmentIntf"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema" >
	<SOAP-ENV:Body>
		<mns:Foglalas
			xmlns:mns="urn:MMAppointmentIntf-IMMAppointment" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
			<pPassword xsi:type="xs:string">Eh9ET437DBfC</pPassword>
			<pId xsi:type="xs:string">KULCSOK</pId>
			<pUzenet xsi:type="xs:string">UZENET</pUzenet>
			<pIdopont xsi:type="xs:dateTime">IDOPONT</pIdopont>
			<pForras xsi:type="ns1:TForras">fMobilApp</pForras>
		</mns:Foglalas>
	</SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

export const getUserInfoEnvelop = `<?xml version="1.0" encoding="UTF-8"?>
  <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" xmlns:ns1="urn:MMAppointmentIntf" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="http://tempuri.org/" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <SOAP-ENV:Body>
        <mns:GetUserInfo xmlns:mns="urn:MMAppointmentIntf-IMMAppointment" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
           <pPassword xsi:type="xs:string" >Eh9ET437DBfC</pPassword>
           <pId xsi:type="xs:string" >KULCSOK</pId>
        </mns:GetUserInfo>
     </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>`;

let defaultHeader = {
  'Content-Type': 'text/xml;charset=UTF-8',
  soapAction: 'urn:MMAppointmentIntf-IMMAppointment#ELJARAS',
};

export function getAktHeader(eljaras) {
  defaultHeader.soapAction = defaultHeader.soapAction.replace(
    'ELJARAS',
    eljaras,
  );
  return defaultHeader;
}

export const xmlOptionsV1 = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: false, // <---Ezt lett módosítva
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) =>
    he.decode(val, {isAttributeValue: true}), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ['parse-me-as-string'],
};

export const xmlOptionsV2 = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: true, // <---Ezt lett módosítva
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) =>
    he.decode(val, {isAttributeValue: true}), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ['parse-me-as-string'],
};

export function unEscapeHTML(escapedHTML) {
  return escapedHTML
    .toString()
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}



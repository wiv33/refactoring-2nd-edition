const api = require("axios");

module.exports = {
    send(artMnfctSeq) {
        api.get("/mgt/AGSVC0303UC.do", {
            params: {
                artMnfctSeq: artMnfctSeq,
                siteCd: "JAD",
                specialBulkSite: 11,
                iflag: "R"
            },
            headers: {
                Cookie: "MSESSIONID=dRMAhqpQZPDnXUTmJSBQ9qpMXe_6VzEsoiFM-ILO.PRD-MGT"
            }
        }).then(res => console.log(res))
        .finally(() => {

        });
    }
}
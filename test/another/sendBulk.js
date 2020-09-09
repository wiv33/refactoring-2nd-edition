const api = require("axios");

module.exports = {
    send(artMnfctSeq) {
        api.get("https://admin-jam.joins.net/mgt/AGSVC0303UC.do", {
            params: {
                artMnfctSeq: artMnfctSeq,
                siteCd: "JAD",
                specialBulkSite: 11,
                iflag: "R"
            },
            headers: {
                Cookie: "MSESSIONID=1GtgN2PzTknU6Nx7ysv7urPM5f_NHY4SNMGhqBJg.PRD-MGT"
            }
        })
        .then(res => console.log(res))
        .finally(() => {

        });
    }
}
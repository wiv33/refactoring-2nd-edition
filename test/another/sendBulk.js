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
                Cookie: "MSESSIONID=r8bYorOtjAeEZkkj__7zqNmcjQmfXhoclbb6oEZy.PRD-MGT"
            }
        })
        .then(res => console.log(res))
        .finally(() => {

        });
    }
}
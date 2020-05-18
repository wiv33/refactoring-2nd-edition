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

        }).then(res => console.log(res))
        .finally(() => {

        });
    }
}
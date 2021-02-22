import axios from "axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
import { installInterceptors } from "@jx3box/jx3box-common/js/axios";
const $server = axios.create({
    withCredentials: true,
    baseURL: __server,
});
installInterceptors($server);

function getConfig(key) {
    return $server.get("index/config").then((res) => {
        let _config = {};
        res.data.data.forEach((item) => {
            _config[item.key] = item.val;
        });
        if (key) {
            return _config[key];
        } else {
            return _config;
        }
    });
}

function getArticle(id) {
    return $server
        .get("post/find", {
            params: {
                id: id,
            },
        })
        .then((res) => {
            return res.data.data.post.post_content;
        });
}

export { $server, getConfig, getArticle };

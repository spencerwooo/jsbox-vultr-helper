/*

vultr-helper.js

Author: Spencer Woo

https://spencerwoo.com

A tool written according to vultr cloud api to check account/balance etc.

*/

// 将下面 apiKey 更改至你自己的 apiKey
var apiKey = 'YOUR_OWN_APIKEY'
// 将下面的 serverSubId 更改至你自己想要显示的 serverSubId
var serverSubId = YOUR_OWN_SERVER_SUBID

function getAccountInfo(apiKey) {
    $http.request({
        method: "GET",
        url: "https://api.vultr.com/v1/account/info",
        header: {
            "API-key": apiKey
        },
        body: {},
        handler: function (resp) {
            var data = resp.data;
            // console.log(data);
            var balance = Math.abs(data.pending_charges / data.balance);
            percentBalance = parseFloat(balance * 100).toFixed(2) + "%";
            remainCredit = parseFloat(data.pending_charges) + parseFloat(data.balance);
            $("progress_label").text = "Charges this month: $" + data.pending_charges;
            // console.log(balance);
            $("charges").value = balance;
            $("remaining_credit").text = "$" + Math.abs(remainCredit);
            $("progress_percent").text = percentBalance;
        }
    });
}

function getApiInfo(apiKey) {
    $http.request({
        method: "GET",
        url: "https://api.vultr.com/v1/auth/info",
        header: {
            "API-key": apiKey
        },
        body: {},
        handler: function (resp) {
            var data = resp.data;
            // console.log(data);
            $("email").text = "Email: " + data.email;
            $("name").text = "Name: " + data.name;
        }
    });
}

function getServerInfo(apiKey) {
    $http.request({
        method: "GET",
        url: "https://api.vultr.com/v1/server/list",
        header: {
            "API-key": apiKey
        },
        body: {},
        handler: function (resp) {
            var data = resp.data;
            console.log(data);
            // console.log(data[serverSubId]);

            var serverGeneralInfo = data[serverSubId];

            $("server_os").text = "# IP: " + serverGeneralInfo.main_ip + " " + serverGeneralInfo.os;
            if (serverGeneralInfo.vcpu_count == 1) {
                $("server_cpu_info").text = serverGeneralInfo.vcpu_count + " Core";
            } else {
                $("server_cpu_info").text = serverGeneralInfo.vcpu_count + " Cores";
            }
            $("server_ram_info").text = serverGeneralInfo.ram;

            var serverChargesPercent = parseFloat(serverGeneralInfo.pending_charges) / parseFloat(serverGeneralInfo.cost_per_month);
            $("server_charges_label").text = "Current charges: $" + serverGeneralInfo.pending_charges;
            $("server_charges_detail").text = parseFloat(serverChargesPercent * 100).toFixed(2) + "%";
            $("server_charges").value = parseFloat(serverChargesPercent);

            var serverUsagePercent = parseFloat(serverGeneralInfo.current_bandwidth_gb) / parseFloat(serverGeneralInfo.allowed_bandwidth_gb);
            // console.log(serverUsagePercent);
            $("server_usage_label").text = "Server usage: " + serverGeneralInfo.current_bandwidth_gb + " GB"
            $("server_usage_percent").text = parseFloat(serverUsagePercent * 100).toFixed(2) + "%";
            $("server_usage").value = parseFloat(serverUsagePercent);

        }
    })
}

function renderUI() {
    $ui.render({
        props: {
            title: "Vultr"
        },
        views: [{
            type: "label",
            props: {
                id: "email",
                align: $align.left,
                text: "Email: ",
                font: $font(12),
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "name",
                align: $align.left,
                text: "Name: ",
                font: $font(12),
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("email").bottom)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "remaining_credit",
                font: $font(28),
                text: "$..",
                align: $align.right,
                textColor: $color("#7db249")
            },
            layout: function (make, view) {
                make.right.inset(15)
                make.top.equalTo(view.super).inset(5)
            }
        }, {
            type: "label",
            props: {
                id: "remaining_credit_label",
                font: $font(12),
                align: $align.right,
                textColor: $color("#888888"),
                text: "Remaining Credit"
            },
            layout: function (make, view) {
                make.right.inset(15)
                make.top.equalTo(view.super).equalTo($("remaining_credit").bottom)
            }
        }, {
            type: "label",
            props: {
                id: "progress_label",
                align: $align.left,
                font: $font("bold", 14),
                text: "Charges this month: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("name").bottom).offset(5)
                make.height.equalTo(30)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "progress_percent",
                align: $align.right,
                font: $font(14),
                text: "...%",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("name").bottom).offset(7)
                make.height.equalTo(30)
                make.left.right.inset(15)
            }
        }, {
            type: "progress",
            props: {
                id: "charges"
            },
            layout: function (make, view) {
                make.top.equalTo($("progress_label").bottom).offset(5)
                make.left.equalTo(15)
                make.right.inset(15)
            }
        }, {
            type: "label",
            props: {
                id: "server",
                align: $align.left,
                font: $font("bold", 14),
                text: "SERVER DETAILS",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("charges").bottom).offset(30)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_os",
                align: $align.left,
                font: $font("bold", 14),
                text: "# IP: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("server").bottom).offset(10)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_cpu",
                align: $align.left,
                font: $font(14),
                text: "CPU",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_os").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_cpu_info",
                align: $align.right,
                font: $font(14),
                text: "... Core",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_os").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_ram",
                align: $align.left,
                font: $font(14),
                text: "RAM",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_cpu").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_ram_info",
                align: $align.right,
                font: $font(14),
                text: "... MB",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_cpu").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_charges_label",
                align: $align.left,
                font: $font(14),
                text: "Current charges: ",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_ram").bottom).offset(5)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_charges_detail",
                align: $align.right,
                font: $font(14),
                text: "$...",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_ram").bottom).offset(7)
                make.left.right.inset(15)
            }
        }, {
            type: "progress",
            props: {
                id: "server_charges"
            },
            layout: function (make, view) {
                make.top.equalTo($("server_charges_label").bottom).offset(5)
                make.left.equalTo(15)
                make.right.inset(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_usage_label",
                align: $align.left,
                font: $font(14),
                text: "Server usage: ",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_charges").bottom).offset(5)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "server_usage_percent",
                align: $align.right,
                font: $font(14),
                text: "...%",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("server_charges").bottom).offset(7)
                make.left.right.inset(15)
            }
        }, {
            type: "progress",
            props: {
                id: "server_usage"
            },
            layout: function (make, view) {
                make.top.equalTo($("server_usage_percent").bottom).offset(5)
                make.left.equalTo(15)
                make.right.inset(15)
            }
        }]
    })
}

function main() {
    renderUI();
    $ui.toast("Refreshing...");
    getAccountInfo(apiKey);
    getApiInfo(apiKey);
    getServerInfo(apiKey);
    // console.log("Hello World");
}

main();
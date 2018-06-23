/*

vultr-helper.js

Author: Spencer Woo

https://spencerwoo.com

A tool written according to vultr cloud api to check account/balance etc.

*/

// 将下面 apiKey 更改至你自己的 apiKey
var apiKey = 'YOUR_OWN_API_KEY'

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
            console.log(data);
            var balance = Math.abs(data.pending_charges / data.balance);
            percentBalance = parseInt(balance * 100) + "%";
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
            console.log(data);
            $("email").text = "Email: " + data.email;
            $("name").text = "Name: " + data.name;
        }
    });
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
        }]
    })
}

function main() {
    getAccountInfo(apiKey);
    getApiInfo(apiKey);
    renderUI();
    // console.log("Hello World");
}

main();
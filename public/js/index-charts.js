
window.chartColors = {
    green: "#75c181",
    gray: "#a9b5c9",
    text: "#252930",
    border: "#e7e9ed",
};

// chart js

// Display a loading icon in our display element
// Request the JSON and process it
function drawChart(){
    $.ajax({
        type: "get",
        url: "/api/order/getData",
        dataType: "json",
        success: showData
    });
    function showData(response){
        console.log("data = " + response);
        var week_1 = response.slice(0, 7);
        var week_2 = response.slice(7, 14);
        var week_3 = response.slice(14, 21);
        var barChartConfig = {
            type: "bar",
            data: {
                labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: [
                    {
                        label: "Total sales",
                        backgroundColor: window.chartColors.green,
                        borderColor: window.chartColors.green,
                        borderWidth: 1,
                        maxBarThickness: 16,
                        data: week_3,
                    },
                ],
            },
            options: {
                responsive: true,
                aspectRatio: 1.5,
                legend: {
                    position: "bottom",
                    align: "end",
                },
                title: {
                    display: true,
                    text: "Total Sales of Current Week",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                    titleMarginBottom: 10,
                    bodySpacing: 10,
                    xPadding: 16,
                    yPadding: 16,
                    borderColor: window.chartColors.border,
                    borderWidth: 1,
                    backgroundColor: "#fff",
                    bodyFontColor: window.chartColors.text,
                    titleFontColor: window.chartColors.text,
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                            gridLines: {
                                drawBorder: false,
                                color: window.chartColors.border,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            gridLines: {
                                drawBorder: false,
                                color: window.chartColors.borders,
                            },
                        },
                    ],
                },
            },
        };
        var lineChartConfig = {
            type: 'line',
            data: {
                labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

                datasets: [{
                    label: 'Sales in previous week',
                    fill: false,
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: week_2,
                }, {
                    label: 'Sales in 2 weeks ago',
                    borderDash: [3, 5],
                    backgroundColor: window.chartColors.gray,
                    borderColor: window.chartColors.gray,
                    data: week_1,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                aspectRatio: 1.5,

                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'end',
                },

                title: {
                    display: true,
                    text: 'Total Sales In Previous Weeks',

                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    titleMarginBottom: 10,
                    bodySpacing: 10,
                    xPadding: 16,
                    yPadding: 16,
                    borderColor: window.chartColors.border,
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    bodyFontColor: window.chartColors.text,
                    titleFontColor: window.chartColors.text,

                    callbacks: {
                        //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                        label: function(tooltipItem, data) {
                            if (parseInt(tooltipItem.value) >= 1000) {
                                return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                return '$' + tooltipItem.value;
                            }
                        }
                    },

                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            drawBorder: false,
                            color: window.chartColors.border,
                        },
                        scaleLabel: {
                            display: false,

                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            drawBorder: false,
                            color: window.chartColors.border,
                        },
                        scaleLabel: {
                            display: false,
                        },
                        ticks: {
                            beginAtZero: true,
                            userCallback: function(value, index, values) {
                                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                            }
                        },
                    }]
                }
            }
        };
        var lineChart = document.getElementById('canvas-linechart').getContext('2d');
        window.myLine = new Chart(lineChart, lineChartConfig);
        var barChart = document.getElementById("canvas-barchart").getContext("2d");
        window.myBar = new Chart(barChart, barChartConfig);
        $(document).ready(function(){
            setTimeout(drawChart, 60000); // auto get new date after 1 minutes
        });
    }
}
drawChart();
function getNumbers(){
    $.ajax({
        type: "get",
        url: "/api/order/getTotalSales",
        dataType: "json",
        success: showData
    });
    function showData(response){
        console.log("numbers = " + response);
        $('#total_sale').text(response[0]);
        $('#total_order').text(response[1]);
        $('#total_comment').text(response[2]);
        $(document).ready(function(){
            setTimeout(getNumbers, 60000);
        });
    }
}
getNumbers();
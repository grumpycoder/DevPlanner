$(function () {


    var uri = "/api/tickets";
    $('#grid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'id',
            loadUrl: uri
        }),
        remoteOperations: true,
        columns: [
            { dataField: 'ticketNumber', caption: 'Ticket' },
            { dataField: 'title', caption: 'Title' },
            { dataField: 'type', caption: 'Type' },
            { dataField: 'status', caption: 'Status' },
            {
                caption: 'Dates',
                columns: [
                    { dataField: 'startDate', caption: 'Start Date', dataType: 'date' },
                    { dataField: 'dueDate', caption: 'Due Date', dataType: 'date' },
                ]
            },
            { dataField: 'priority', caption: 'Priority' },
            { dataField: 'estHours', caption: 'Estimate Hours' },
            { dataField: 'year', caption: 'Year' },
            { dataField: 'quarter', caption: 'Quarter' },
        ],
        wordWrapEnabled: true,
        allowColumnResizing: true,
        columnResizingMode: "widget",
        columnAutoWidth: true,
        columnChooser: {
            enabled: true
        },
        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: "gridFilterStorage"
        },
        filterRow: {
            visible: true
        },
        headerFilter: {
            visible: true
        },
        groupPanel: {
            visible: true
        },
        scrolling: {
            mode: "virtual"
        },
        height: 800,
        showBorders: true,
        sortByGroupSummaryInfo: [{
            summaryItem: "count"
        }],
        summary: {
            totalItems: [
                {
                    column: "ticketNumber",
                    displayFormat: '{0} Total Tickets',
                    summaryType: 'count',
                    showInGroupFooter: true,
                    showInColumn: 'ticketNumber'
                },
                {
                    column: "estHours",
                    displayFormat: 'Estimated Hours {0}',
                    summaryType: "sum",
                    showInGroupFooter: true
                }
            ],
            groupItems: [
                {
                    summaryType: "count",
                    displayFormat: '{0} Tickets',
                    //showInColum: 'ticketNumber', 
                    //showInGroupFooter: 'false'
                },
                {
                    column: "estHours",
                    displayFormat: '{0} Estimated Hours',
                    summaryType: "sum",
                    //showInColumn: 'ticketNumber', 
                    //showInGroupFooter: 'false'
                },

            ]
        },

    })

    var ticketCounts = [];
    var data;
    var tickets = $.get(uri).then(function (r) {
        window.tickets = r.data;

        var tags = _.chain(r.data).map(d => d.year).flatten().countBy().value();

        data = _.map(tags, function (value, key) {
            return {
                year: key,
                total: value
            };
        });

        $("#chart").dxChart({
            dataSource: data,
            commonSeriesSettings: {
                argumentField: "year",
                type: "bar",
                label: {
                    color: "#8c8cff",
                    visible: true,
                    format: {
                        type: "fixedPoint",
                        precision: 0,

                    }
                },
            },
            series: [
                {
                    valueField: "total",
                    name: 'Total Count',
                    color: '#ffaa66',
                }
            ],
            title: 'Total Tickets',
            legend: {
                visible: false,
                verticalAlignment: "top",
                horizontalAlignment: "right"
            },
        });

    })


});
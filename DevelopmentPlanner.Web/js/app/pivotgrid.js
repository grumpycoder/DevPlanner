$(function () {
    var uri = "/api/tickets";

    var pivotGridChart = $("#pivotgrid-chart").dxChart({
        commonSeriesSettings: {
            type: "bar"
        },
        tooltip: {
            enabled: true,
            //customizeTooltip: function (args) {
            //    var valueText = (args.seriesName.indexOf("Total") !== -1) ?
            //        Globalize.formatCurrency(args.originalValue,
            //            "USD", { maximumFractionDigits: 0 }) :
            //        args.originalValue;

            //    return {
            //        html: args.seriesName + "<div class='currency'>"
            //            + valueText + "</div>"
            //    };
            //}
        },
        size: {
            height: 320
        },
        adaptiveLayout: {
            width: 450
        }
    }).dxChart("instance");

    var pivotGrid = $("#pivotgrid").dxPivotGrid({
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        height: 600,
        showBorders: true,
        fieldChooser: {
            enabled: true
        },
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'id',
            loadUrl: uri, 
        }),
        fieldPanel: {
            showColumnFields: true,
            showDataFields: true,
            showFilterFields: true,
            showRowFields: true,
            allowFieldDragging: true,
            visible: true
        },
        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: "pivotgridFilterStorage"
        },
        onContextMenuPreparing: contextMenuPreparing,
    }).dxPivotGrid("instance");

    pivotGrid.bindChart(pivotGridChart, {
        dataFieldsDisplayMode: "splitPanes",
        alternateDataFields: false
    });

    function contextMenuPreparing(e) {
        var dataSource = e.component.getDataSource(),
            sourceField = e.field;

        if (sourceField) {
            if (!sourceField.groupName || sourceField.groupIndex === 0) {
                e.items.push({
                    text: "Hide field",
                    onItemClick: function () {
                        var fieldIndex;
                        if (sourceField.groupName) {
                            fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
                        } else {
                            fieldIndex = sourceField.index;
                        }

                        dataSource.field(fieldIndex, {
                            area: null
                        });
                        dataSource.load();
                    }
                });
            }

            if (sourceField.dataType === "number") {
                var setSummaryType = function (args) {
                    dataSource.field(sourceField.index, {
                        summaryType: args.itemData.value
                    });

                    dataSource.load();
                },
                    menuItems = [];

                e.items.push({ text: "Summary Type", items: menuItems });

                $.each(["Sum", "Avg", "Min", "Max", "Count"], function (_, summaryType) {
                    var summaryTypeValue = summaryType.toLowerCase();

                    menuItems.push({
                        text: summaryType,
                        value: summaryType.toLowerCase(),
                        onItemClick: setSummaryType,
                        selected: e.field.summaryType === summaryTypeValue
                    });
                });
            }
        }
    }

    $("#btnReset").dxButton({
        text: "Reset the PivotGrid's State",
        onClick: function () {
            pivotGrid.getDataSource().state({});
        }
    });

}); 
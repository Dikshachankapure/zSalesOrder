sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	'demo/zsalesorders/model/InitPage'
], function (Controller, JSONModel, ChartFormatter, Format,InitPageUtil) {
	"use strict";

	return Controller.extend("demo.zsalesorders.controller.View1", {
		onInit: function () {
			
			var oModel = this.getView().getModel();
			this.getView().byId("tblSalesOrder").setModel(oModel);
			
			var that = this;
			that._loadChart();
		},
		_loadChart: function (oEvent) {
			var oModel = this.getView().getModel();
			this.getView().setModel(oModel);

			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: true
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true,
					text: 'Products By Price'
				}
			});
			
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
			InitPageUtil.initPageSettings(this.getView());
		
		},
		
		onSearch: function (oEvent) {
			var query = oEvent.getSource().getValue();
			if (query && query.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("ProductID", sap.ui.model.FilterOperator.Contains, query);
				var allFilter = new sap.ui.model.Filter([oFilter1], false);
			}
			var obinding = this.getView().byId("tblSalesOrder").getBinding("items");
			obinding.filter(allFilter);

		},
		
		onPressList: function (oEvent) {
			var oTable = this.getView().byId("tblSalesOrder");
			var oChart = this.getView().byId("chartFixFlex");
			oTable.setVisible(true);
			oChart.setVisible(false);
		},
		
		onPressChart: function (oEvent) {
			var oTable = this.getView().byId("tblSalesOrder");
			var oChart = this.getView().byId("chartFixFlex");
			oTable.setVisible(false);
			oChart.setVisible(true);
			
		}
		
	});
});
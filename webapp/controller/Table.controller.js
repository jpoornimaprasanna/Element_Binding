sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"sap/ui/core/routing/History"
		], function (Controller, History) {
			"use strict";

			return Controller.extend("Assignment.AssignmentC.controller.Table", {
				onInit: function () {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.getRoute("EmpData").attachPatternMatched(this._onObjectMatched, this);
				},

				_onObjectMatched: function (oEvent) {
					var oArg = oEvent.getParameters("arguments");
					var oView = this.getView();
					oView.setModel(this.getOwnerComponent().getModel("empDetails"));
					oView.bindElement("/details/" + oArg.arguments.obj);
				},
				getRouter: function () {
					return sap.ui.core.UIComponent.getRouterFor(this);
				},
				onNavBack: function (oEvent) {
					var oHistory, sPreviousHash;
					oHistory = History.getInstance();
					sPreviousHash = oHistory.getPreviousHash();
					if (sPreviousHash !== undefined) {
						window.history.go(-1);
					} else {
						this.getRouter().navTo("View1", {}, true /*no history*/ );
					}
				},
				getEmpData: function (oEvent) {
					var oItem = oEvent.getSource();
					var model = this.getView().getModel("empDetails");
					var text = oEvent.getParameters().listItem.getBindingContext("empDetails").getObject();

					// Routing 
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					var oObj = oEvent.getParameter("listItem").getBindingContext("empDetails").getPath();
					oRouter.navTo("EmpData", {
						//	obj:text,
						obj: oObj.substr(9)
					});
				}
			});
		});
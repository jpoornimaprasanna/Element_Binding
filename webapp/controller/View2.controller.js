sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("Assignment.AssignmentC.controller.View2", {
		onInit: function () {
			this.getView().setModel(new JSONModel(), "oDetail");
			this.getView().setModel(new JSONModel(), "oStateList");
			this.getView().getModel("oDetail").setProperty("/editable", false);
			this.getView().getModel("oDetail").setProperty("/soterdOrder", false);
		},

		onSearch: function (event) {
			var olist = this.getView().byId("list1"),
				arr = [],
				binding,
				filters;
			filters = new Filter({
				filters: [new Filter("name", FilterOperator.Contains, event.getSource().getValue()),
					new Filter("id", FilterOperator.Contains, event.getSource().getValue())
				],
				and: false
			});

			//  var empId = new Filter("number", FilterOperator.Contains,event.getSource().getValue());
			binding = olist.getBinding("items");
			arr.push(filters);
			// arr.push(empId);
			binding.filter(arr);
			binding.filter(arr);
		},
		sort: function (oEvent) {

			var oItem = oEvent.getSource();
			var model = this.getView().getModel("empDetails");
			var array = model.oData.details;
			
			array.sort(function (a, b) {
				var nameA = a.name.toUpperCase(); // ignore upper and lowercase
				var nameB = b.name.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
			var array = model.oData.details;
			model.setProperty("/details", array);
		},
		onPressItem: function (oEvent) {
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
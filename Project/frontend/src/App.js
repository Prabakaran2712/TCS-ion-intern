import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Item from "./pages/Item";
import ItemGroup from "./pages/ItemGroup";
import ItemAdj from "./pages/Itemadjust";
import ItemAdd from "./pages/ItemForm";
import ItemGroupFrom from "./pages/ItemGroupForm";
import ItemAdjForm from "./pages/ItemAdjustForm";
import AddCustomer from "./pages/sales/customers/addCustomer";
import EditCustomer from "./pages/sales/customers/editCustomer";
import ViewCustomers from "./pages/sales/customers/viewCustomers";
import AddSalesOrder from "./pages/sales/salesOrders/AddSalesOrder";
import ViewSalesOrderList from "./pages/sales/salesOrders/viewSalesOrder";
import SalesDetail from "./pages/sales/salesOrders/salesDetails";
import AddPackage from "./pages/sales/pckgs/AddPackage";
import PackagesList from "./pages/sales/pckgs/PackageList";
import PackageDetail from "./pages/sales/pckgs/PackageDetail";
import AddDeliveryChallan from "./pages/sales/challans/AddDeliveryChallan";
import DeliveryChallansList from "./pages/sales/challans/viewDeliveryChallan";
import DeliveryChallanDetail from "./pages/sales/challans/DeliveryChallanDetails";
import AddInvoice from "./pages/sales/invoices/AddInvoice";
import InvoicesList from "./pages/sales/invoices/InvoiceList";
import InvoiceDetail from "./pages/sales/invoices/InvoiceDetail";
import AddPayment from "./pages/sales/payment/AddPayment";
import PaymentList from "./pages/sales/payment/PaymentList";
import AddSalesReturn from "./pages/sales/sales-return/AddsSalesReturn";
import SalesReturnsList from "./pages/sales/sales-return/SalesReturnList";
import SalesReturnDetail from "./pages/sales/sales-return/salesReturnDetail";
import AddCreditNotes from "./pages/sales/credit-notes/AddCreditNotes";
import CreditNotesList from "./pages/sales/credit-notes/CreditNodeList";
import VendorsList from "./pages/purchase/vendors/Vendorlist";
import AddVendor from "./pages/purchase/vendors/AddVendor";
import EditVendor from "./pages/purchase/vendors/EditVendor";
import PurchaseOrdersList from "./pages/purchase/purchaseOrder/PurchaseOrderList";
import AddPurchaseOrder from "./pages/purchase/purchaseOrder/AddPurchaseOrder";
import PurchaseDetail from "./pages/purchase/purchaseOrder/PurchaseOrderDetails";
import BillsList from "./pages/purchase/bills/BillList";
import Billdetail from "./pages/purchase/bills/BillDetail";
import AddBill from "./pages/purchase/bills/AddBill";
import VendorCreditDetails from "./pages/purchase/vendorCredits/VendorCreditDetails";
import AddVendorCredit from "./pages/purchase/vendorCredits/AddVendorCredit";
import Reports from "./pages/Reports/Report";
import VendorCreditList from "./pages/purchase/vendorCredits/VendorCreditList";
const data = [
  {
    id: 1,
    name: "ITEMS",
    data: [
      { name: "Items", link: "/item", id: 2 },
      { name: "Groups", link: "/itemgroup", id: 3 },
      { name: "Adjustments", link: "/itemadj", id: 4 },
    ],
  },
  {
    id: 2,
    name: "SALES",
    data: [
      { name: "Customers", link: "/customerview", id: 6 },
      { name: "Sales Orders", link: "/viewsalesorder", id: 8 },
      { name: "Packages", link: "/viewpackagelist", id: 10 },
      { name: "Delivery Challan", link: "/viewchallan", id: 12 },
      { name: "Invoice", link: "/invoicelist", id: 14 },
      { name: "Payment", link: "/viewpaymentlist", id: 16 },
      { name: "Sales Return", link: "/viewsalesreturnlist", id: 18 },
      { name: "Credit Notes", link: "/viewcreditnotes", id: 20 },
    ],
  },
  {
    id: 3,
    name: "PURCHASE",
    data: [
      { name: "Vendors", link: "/purchases/vendors", id: 21 },
      { name: "Purchase", link: "/purchases/order", id: 22 },
      { name: "Bill", link: "/purchases/bills", id: 23 },
      { name: "Vendor Credits", link: "/purchases/vendor-credits", id: 24 },
    ],
  },
];
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar details={data} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Reports />} />
            <Route path="/item" element={<Item />} />
            <Route path="/itemadd" element={<ItemAdd />} />
            <Route path="/itemgrpadd" element={<ItemGroupFrom />} />
            <Route path="/itemgroup" element={<ItemGroup />} />
            <Route path="/itemadj" element={<ItemAdj />} />
            <Route path="/itemadjadd" element={<ItemAdjForm />} />
            <Route path="/customeradd" element={<AddCustomer />} />
            <Route path="/customeredit/:id" element={<EditCustomer />} />
            <Route path="/customerview" element={<ViewCustomers />} />
            <Route path="/addsalesorder" element={<AddSalesOrder />} />
            <Route path="/viewsalesorder" element={<ViewSalesOrderList />} />
            <Route path="/salesorderdetails/:id" element={<SalesDetail />} />
            <Route path="/addpackage" element={<AddPackage />} />
            <Route path="/viewpackagelist" element={<PackagesList />} />
            <Route path="/viewpackagedetails/:id" element={<PackageDetail />} />
            <Route path="/addchallan" element={<AddDeliveryChallan />} />
            <Route path="/viewchallan" element={<DeliveryChallansList />} />
            <Route
              path="/viewchallandetail/:id"
              element={<DeliveryChallanDetail />}
            />
            <Route path="/addinvoice" element={<AddInvoice />} />
            <Route path="/invoicelist" element={<InvoicesList />} />
            <Route path="/invoicedetail/:id" element={<InvoiceDetail />} />
            <Route path="/addpayment" element={<AddPayment />} />
            <Route path="/viewpaymentlist" element={<PaymentList />} />
            <Route path="/addsalesreturn" element={<AddSalesReturn />} />
            <Route path="/viewsalesreturnlist" element={<SalesReturnsList />} />
            <Route
              path="/salesreturndetail/:id"
              element={<SalesReturnDetail />}
            />
            <Route path="/addcreditnote" element={<AddCreditNotes />} />
            <Route path="/viewcreditnotes" element={<CreditNotesList />} />
            <Route path="purchases">
              <Route path="vendors" element={<VendorsList />} />
              <Route path="vendors/add" element={<AddVendor />} />
              <Route path="vendors/edit/:id" element={<EditVendor />} />
              <Route path="order" element={<PurchaseOrdersList />} />
              <Route path="order/add" element={<AddPurchaseOrder />} />
              <Route path="orderdetails/:id" element={<PurchaseDetail />} />
              <Route path="bills" element={<BillsList />} />
              <Route path="bills/:id" element={<Billdetail />} />
              <Route path="bills/add" element={<AddBill />} />
              <Route
                path="vendor-credits/:id"
                element={<VendorCreditDetails />}
              />
              <Route path="vendor-credits" element={<VendorCreditList />} />
              <Route path="vendor-credits/add" element={<AddVendorCredit />} />
            </Route>

            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

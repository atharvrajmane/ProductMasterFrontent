import React, { useState } from "react";

// Structured data for loan categories and their sub-products
const loanProductsData = {
    "Personal Loan": [
      "Medical Loan",
      "Wedding Loan",
      "Travel Loan",
      "Personal Loan",
      "Consumer Durable Loan (EMI)",
    ],
    "Business Loan": [
      "Business Loan Unsecured",
      "Business Loan Secured",
      "Working Capital Loan",
      "Term Loan",
      "Machinery / Equipment Loan",
      "Invoice Financing",
      "Over Draft",
    ],
    "Home Loan": [
      "Home Purchase Loan",
      "Plot Loan",
      "Home Renovation Loan",
      "Balance Transfer / Top-Up Loan",
    ],
    "Loan Against Property (LAP)": [
      "Loan Against Property (Regular LAP)",
      "Micro Loan Against Property (Micro LAP)",
    ],
    "Gold Loan": ["Gold Loan"],
    "Vehicle Loan": [
      "Car Loan New",
      "Car Loan Used",
      "New Two-Wheeler Loan",
      "Commercial Vehicle Loan",
    ],
    "Education Loan": ["Domestic Education Loan", "International Education Loan"],
    "Agriculture Loan": [
      "Crop Loan",
      "General Loan",
      "Tractor Loan",
      "Kisan Credit Card",
    ],
    "Startup & Professional Loan": [
      "Startup Loan",
      "Professional Loan (Doctors, CAs, Lawyers, etc.)",
    ],
    "Emergency / Instant Loan": ["Bullet Loan", "Daily Basis Loan"],
};

const productCategoryOptions = Object.keys(loanProductsData);

const ProductBasicDetailsForm = () => {
  // Helper function to generate numeric options
  const generateNumericOptions = (start, end, step = 1) =>
    Array.from({ length: (end - start) / step + 1 }, (_, i) =>
      String(start + i * step)
    );

  // Options for various dropdowns
  const repaymentCategoryOptions = [
    "EMI",
    "Bullet Payment",
    "Custom Repayment",
  ];
  const termCategoryOptions = ["Short Term", "Medium Term", "Long Term"];
  const tenureOptions = generateNumericOptions(1, 60);
  const bulletTenureOptions = generateNumericOptions(1, 24);
  
  // NEW: Restored the Rupee format for amount options
  const amountOptions = [
    "₹10000/-",
    "₹25000/-",
    "₹50000/-",
    "₹100000/-",
    "₹200000/-",
    "₹500000/-",
    "₹1000000/-",
  ];
  const productStatusOptions = ["Active", "Inactive", "Draft"];

  const [formData, setFormData] = useState({
    productCategory: "",
    productName: "",
    repaymentCategory: "",
    termCategory: "",
    minTenure: "",
    maxTenure: "",
    bulletTenure: "",
    minAmount: "",
    maxAmount: "",
    automaticClosure: "",
    loanRenewal: "",
    preClosure: "",
    partPayment: "",
    holidayEMI: "",
    assetClassification: "",
    tranches: "",
    generalInsurance: "",
    healthInsurance: "",
    lifeInsurance: "",
    npaRules: "",
    writeOffRules: "",
    settlementRules: "",
    statusOfProduct: "",
    rateOfInterest: "",
    interestMethodology: "",
    amortizationMethod: "",
    repaymentModeAuto: "",
    repaymentModeManual: "",
    repaymentModeOther: "",
    repaymentFrequency: "",
    advancedEmi: "",
    poolingDate: "",
    interestAccrualApplicable: "",
    interestAccrualMethod: "",
    processingFee: "",
    manualProcessingFee: "",
    gstOnProcessingFee: "",
    convenienceFee: "",
    manualConvenienceFee: "",
    gstOnConvenienceFee: "",
    emiBouncingCharges: "",
    manualEmiBouncingCharges: "",
    gstOnEmiBouncingCharges: "",
    latePaymentMethod: "",
    dailyLateCharges: "",
    manualDailyLateCharges: "",
    gstOnDailyLateCharges: "",
    monthlyLateCharges: "",
    manualMonthlyLateCharges: "",
    gstOnMonthlyLateCharges: "",
    creditCompany: "",
    cicProductCode: "",
    minAge: "",
    maxAge: "",
    incomeSource: "",
    incomeRequirement: "",
    foir: "",
    minusOneScoreEligible: "",
    minCreditScore: "",
    inBetweenCreditScore: "",
    creditScoreEligibility: "",
    overdueAcceptable: "",
    manualOverdueAmount: "",
    acceptedLatePayment: "",
    minCreditEnquiries: "",
    maxCreditEnquiries: "",
    sourceOfFunds: "",
    coLendingFacility: "",
    firstNBFC: "",
    firstNBFCShare: "",
    secondNBFC: "",
    secondNBFCShare: "",
  });

  const [productNameOptions, setProductNameOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      if (name === "overdueAcceptable" && value === "No") {
        newState.manualOverdueAmount = "";
      }
      return newState;
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({
      ...formData,
      productCategory: category,
      productName: "",
    });
    setProductNameOptions(category ? loanProductsData[category] : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted! Check the console for the data.");
    setSubmitted(true);
  };

  const renderDropdown = (label, name, value, onChange, options = [], disabled = false) => (
    <div className="flex flex-col w-full px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`border rounded px-3 py-2 bg-white ${disabled ? "cursor-not-allowed" : ""}`}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderYesNo = (label, name) => (
    <div className="flex flex-col w-full px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <div className="mt-1 flex gap-4">
        {["Yes", "No"].map((opt) => (
          <label key={opt} className="flex items-center gap-1">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={formData[name] === opt}
              onChange={handleChange}
              className="accent-blue-600 bg-white"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
  
  const renderManualInput = (label, name, suffix = "", disabled = false) => (
    <div className="flex flex-col px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`Enter value${suffix}`}
        disabled={disabled}
        className={`border rounded px-3 py-2 bg-white ${disabled ? "cursor-not-allowed" : ""}`}
      />
    </div>
  );

  const renderRadioGroup = (label, name, options) => (
    <div className="flex flex-col px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={formData[name] === opt}
              onChange={handleChange}
              className="accent-blue-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  const renderAmortizationRadioGroup = (label, name, options) => (
    <div className="flex flex-col px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 whitespace-nowrap">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={formData[name] === opt}
              onChange={handleChange}
              className="accent-blue-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto bg-white rounded-lg shadow-lg w-full max-w-none">
        <div className="flex items-center p-4 sm:p-6 border-b border-gray-200">
          <button type="button" className="text-gray-600 hover:text-gray-800 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-[#4635FE]">
            Product Master Setting
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#4635FE] text-left">
            Product Basic Details
          </h2>
          <hr className="mb-5"></hr>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderDropdown(
              "Product Category",
              "productCategory",
              formData.productCategory,
              handleCategoryChange,
              productCategoryOptions
            )}
            {renderDropdown(
              "Name of Product",
              "productName",
              formData.productName,
              handleChange,
              productNameOptions,
              !formData.productCategory
            )}
            {renderDropdown(
              "Repayment Category",
              "repaymentCategory",
              formData.repaymentCategory,
              handleChange,
              repaymentCategoryOptions
            )}
            {renderDropdown(
              "Term Category",
              "termCategory",
              formData.termCategory,
              handleChange,
              termCategoryOptions
            )}
            {renderDropdown(
              "Min. Loan Tenure Permitted (Month)",
              "minTenure",
              formData.minTenure,
              handleChange,
              tenureOptions
            )}
            {renderDropdown(
              "Max. Loan Tenure Permitted (Month)",
              "maxTenure",
              formData.maxTenure,
              handleChange,
              tenureOptions
            )}
            {renderDropdown(
              "Bullet Loan Tenure Permitted",
              "bulletTenure",
              formData.bulletTenure,
              handleChange,
              bulletTenureOptions
            )}
            {renderDropdown(
              "Min. Loan Amount Permitted",
              "minAmount",
              formData.minAmount,
              handleChange,
              amountOptions
            )}
            {renderDropdown(
              "Max. Loan Amount Permitted",
              "maxAmount",
              formData.maxAmount,
              handleChange,
              amountOptions
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderYesNo("Automatic Closure On Maturity", "automaticClosure")}
            {renderYesNo(
              "Loan Renewal/Re-scheduling Is Permitted",
              "loanRenewal"
            )}
            {renderYesNo("Pre Closure Is Permitted", "preClosure")}
            {renderYesNo("Part Payment Is Permitted", "partPayment")}
            {renderYesNo("Holiday EMI Is Permitted", "holidayEMI")}
            {renderYesNo(
              "Asset Classification Permitted",
              "assetClassification"
            )}
            {renderYesNo("Tranches", "tranches")}
            {renderYesNo("General Insurance Applicable", "generalInsurance")}
            {renderYesNo("Health Insurance Applicable", "healthInsurance")}
            {renderYesNo("Life Insurance Applicable", "lifeInsurance")}
            {renderYesNo("NPA Rules Applicable", "npaRules")}
            {renderYesNo("Write-off Rules Applicable", "writeOffRules")}
            {renderYesNo("Settlement Rule Applicable", "settlementRules")}
          </div>
          <hr className="mb-10"></hr>

          <h2 className="text-2xl font-bold mb-6 text-[#4635FE] text-left">
            ROI & Repayment Settings
          </h2>
          <hr className="mb-5"></hr>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderManualInput("Rate of Interest (%)", "rateOfInterest")}
            {renderRadioGroup(
              "Interest Rate Methodology",
              "interestMethodology",
              ["Reducing", "Flat", "Hybrid"]
            )}
            <div className="lg:col-span-2">
              {renderAmortizationRadioGroup(
                "Amortization Method",
                "amortizationMethod",
                ["Regular EMI", "Customized EMI", "Bullet Payment"]
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col px-2">
              <label className="text-sm text-left font-medium mb-1">
                Auto - eNACH
              </label>
              <select
                name="repaymentModeAuto"
                value={formData.repaymentModeAuto}
                onChange={handleChange}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                <option value="eNACH Option 1">eNACH Option 1</option>
                <option value="eNACH Option 2">eNACH Option 2</option>
              </select>
            </div>
            <div className="flex flex-col px-2">
              <label className="text-sm text-left font-medium mb-1">
                Manual - Payment Gateway
              </label>
              <select
                name="repaymentModeManual"
                value={formData.repaymentModeManual}
                onChange={handleChange}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                <option value="Gateway 1">Gateway 1</option>
                <option value="Gateway 2">Gateway 2</option>
              </select>
            </div>
            {renderRadioGroup("Other Modes", "repaymentModeOther", [
              "Cheque",
              "Cash",
            ])}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col px-2">
              <label className="text-sm text-left font-medium mb-1">
                Repayment Frequency
              </label>
              <select
                name="repaymentFrequency"
                value={formData.repaymentFrequency}
                onChange={handleChange}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annually">Annually</option>
              </select>
            </div>
            {renderRadioGroup("Advanced EMI Applicable", "advancedEmi", [
              "Yes",
              "No",
            ])}
          </div>
          <div className="mb-6 px-2">
            <label className="text-sm text-left font-medium mb-2 block">
              Repayment Pooling Dates
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 lg:grid-cols-15 gap-6 mb-8">
              {Array.from({ length: 31 }, (_, i) => {
                const day = String(i + 1).padStart(2, "0");
                return (
                  <label
                    key={day}
                    className="flex items-center justify-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="poolingDate"
                      value={day}
                      checked={formData.poolingDate === day}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {day}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderRadioGroup(
              "Interest Accrual Method Applicable",
              "interestAccrualApplicable",
              ["Yes", "No"]
            )}
            <div className="flex flex-col px-2">
              <label className="text-sm text-left font-medium mb-1">
                Select Interest Accrual Method
              </label>
              <select
                name="interestAccrualMethod"
                value={formData.interestAccrualMethod}
                onChange={handleChange}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <hr className="mb-10"></hr>

          <h2 className="text-2xl font-bold mb-6 text-[#4635FE] text-left">
            Applicable Fees & Charges
          </h2>
          <hr className="mb-5"></hr>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <h3 className="text-lg font-semibold text-left md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              Applicable Upfront Charges
            </h3>
            {renderYesNo("Processing Fee", "processingFee")}
            {renderManualInput(
              "Manually Enter Processing Fee in %",
              "manualProcessingFee",
              " (%)"
            )}
            {renderYesNo("GST on Processing Fee", "gstOnProcessingFee")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <h3 className="text-lg font-semibold text-left md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              Applicable Convenience Fee
            </h3>
            {renderYesNo("Convenience Fee", "convenienceFee")}
            {renderManualInput(
              "Manually Enter Convenience Fee in %",
              "manualConvenienceFee",
              " (%)"
            )}
            {renderYesNo("GST on Convenience Fee", "gstOnConvenienceFee")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <h3 className="text-lg font-semibold text-left md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              Applicable Incidental Charges
            </h3>
            {renderYesNo("EMI Bouncing Charges", "emiBouncingCharges")}
            {renderManualInput(
              "Manually Enter EMI Bouncing Charges",
              "manualEmiBouncingCharges"
            )}
            {renderYesNo(
              "GST on EMI Bouncing Charges",
              "gstOnEmiBouncingCharges"
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <h3 className="text-lg text-left font-semibold mb-4 mr-10">
              Select Applicable Late Payment Charges Method
            </h3>
            <div className="flex flex-col px-2 col-span-1">
              <select
                name="latePaymentMethod"
                value={formData.latePaymentMethod}
                onChange={handleChange}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                <option value="Flat">Flat</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <h3 className="text-lg font-semibold text-left md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              Daily Late Payment Charges
            </h3>
            {renderYesNo("Daily Late Payment Charges", "dailyLateCharges")}
            {renderManualInput(
              "Manually Enter Daily Late Payment Charges in % with compounding",
              "manualDailyLateCharges",
              " (%)"
            )}
            {renderYesNo(
              "GST on Daily Late Payment Charges",
              "gstOnDailyLateCharges"
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <h3 className="text-lg font-semibold text-left md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              Monthly Late Payment Charges
            </h3>
            {renderYesNo("Monthly Late Payment Charges", "monthlyLateCharges")}
            {renderManualInput(
              "Manually Enter Monthly Late Payment Charges",
              "manualMonthlyLateCharges"
            )}
            {renderYesNo(
              "GST on Monthly Late Payment Charges",
              "gstOnMonthlyLateCharges"
            )}
          </div>
          <hr className="mb-10"></hr>
          
          <h2 className="text-2xl font-bold text-left mb-6 text-[#4635FE]">
            Credit Information Company & Product Code
          </h2>
          <hr className="mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderDropdown(
              "Select Credit Information Company",
              "creditCompany",
              formData.creditCompany,
              handleChange,
              ["CIBIL", "Experian", "Equifax", "CRIF"]
            )}
            {renderDropdown(
              "Select CIC Product Code",
              "cicProductCode",
              formData.cicProductCode,
              handleChange,
              ["Code 1", "Code 2", "Code 3"]
            )}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-left text-[#4635FE]">
            Business Rule Engine – Credit Approval Decision
          </h2>
          <hr className="mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderDropdown(
              "Product Category",
              "productCategory",
              formData.productCategory,
              handleCategoryChange,
              productCategoryOptions
            )}
            {renderDropdown(
              "Name of Product",
              "productName",
              formData.productName,
              handleChange,
              productNameOptions,
              !formData.productCategory
            )}
            {renderDropdown(
              "Min Borrowers Age Required",
              "minAge",
              formData.minAge,
              handleChange,
              generateNumericOptions(18, 25)
            )}
            {renderDropdown(
              "Max Borrowers Age Allowed",
              "maxAge",
              formData.maxAge,
              handleChange,
              generateNumericOptions(55, 75)
            )}
            {renderDropdown(
              "Borrowers Type of Income Source",
              "incomeSource",
              formData.incomeSource,
              handleChange,
              ["Salaried", "Self-employed", "Pension"]
            )}
            {renderDropdown(
              "Borrowers Income Requirements",
              "incomeRequirement",
              formData.incomeRequirement,
              handleChange,
              // NEW: Restored Rupee format here
              ["₹10000/-", "₹15000/-", "₹20000/-"]
            )}
            {renderDropdown(
              "FOIR (%)",
              "foir",
              formData.foir,
              handleChange,
              generateNumericOptions(40, 75, 5).map((v) => `${v}%`)
            )}
            {renderYesNo(
              "-1 Credit Score Eligibility",
              "minusOneScoreEligible"
            )}
            {renderDropdown(
              "Minimum Credit Score Required",
              "minCreditScore",
              formData.minCreditScore,
              handleChange,
              generateNumericOptions(600, 800, 10)
            )}
            {renderDropdown(
              "In Between Credit Score Required",
              "inBetweenCreditScore",
              formData.inBetweenCreditScore,
              handleChange,
              ["660-700", "670-720", "680-730"]
            )}
            {renderDropdown(
              "Eligibility Based on Credit Score",
              "creditScoreEligibility",
              formData.creditScoreEligibility,
              handleChange,
              ["Strict", "Flexible"]
            )}
            {renderYesNo("Over Due Acceptable", "overdueAcceptable")}
            {renderManualInput(
              "Manual Overdue Amount",
              "manualOverdueAmount",
              " (₹)",
              formData.overdueAcceptable !== "Yes"
            )}
            {renderDropdown(
              "Accepted Late Payment in Credit Score",
              "acceptedLatePayment",
              formData.acceptedLatePayment,
              handleChange,
              generateNumericOptions(0, 10)
            )}
            {renderDropdown(
              "Min Credit Enquiries Accepted",
              "minCreditEnquiries",
              formData.minCreditEnquiries,
              handleChange,
              generateNumericOptions(0, 5)
            )}
            {renderDropdown(
              "Max Credit Enquiries Accepted",
              "maxCreditEnquiries",
              formData.maxCreditEnquiries,
              handleChange,
              generateNumericOptions(0, 15)
            )}
          </div>
          <hr className="mb-10"></hr>
          
          <h2 className="text-2xl font-bold text-left mb-6 text-[#4635FE]">
            Source of Funds
          </h2>
          <hr className="mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderDropdown(
              "Source of Funds",
              "sourceOfFunds",
              formData.sourceOfFunds,
              handleChange,
              ["Bank", "NBFC", "Private Equity", "Other"]
            )}
            {renderYesNo("Co-Lending Facility", "coLendingFacility")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderDropdown(
              "Select 1st Co-Lending NBFC",
              "firstNBFC",
              formData.firstNBFC,
              handleChange,
              ["NBFC A", "NBFC B", "NBFC C"]
            )}
            {renderDropdown(
              "Select 1st Co-Lending NBFC Share %",
              "firstNBFCShare",
              formData.firstNBFCShare,
              handleChange,
              generateNumericOptions(10, 90, 10).map((v) => `${v}%`)
            )}
            {renderDropdown(
              "Select 2nd Co-Lending NBFC",
              "secondNBFC",
              formData.secondNBFC,
              handleChange,
              ["NBFC X", "NBFC Y", "NBFC Z"]
            )}
            {renderDropdown(
              "Select 2nd Co-Lending NBFC Share %",
              "secondNBFCShare",
              formData.secondNBFCShare,
              handleChange,
              generateNumericOptions(10, 90, 10).map((v) => `${v}%`)
            )}
          </div>

          <h2 className="text-2xl font-bold text-left mb-6 text-[#4635FE]">
            Product Activation
          </h2>
          <hr className="mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {renderDropdown(
              "Status of Product",
              "statusOfProduct",
              formData.statusOfProduct,
              handleChange,
              productStatusOptions
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white w-40 px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          {submitted && (
            <p className="mt-4 text-green-600 font-medium text-right">
              Form submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default ProductBasicDetailsForm;


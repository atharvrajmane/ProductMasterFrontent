import React, { useState } from "react";

const ProductBasicDetailsForm = () => {
  const [formData, setFormData] = useState({
    //product basic details
    productCategory: "",
    productName: "Bullet Loan",
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

    // ROI & Repayment Settings
    rateOfInterest: "",
    interestMethodology: "",
    amortizationMethod: "",
    repaymentModeAuto: "",
    repaymentModeManual: "",
    repaymentModeOther: "",
    repaymentFrequency: "",
    advancedEmi: "",
    poolingDates: [],
    interestAccrualApplicable: "",
    interestAccrualMethod: "",

    //Applicable Fees Charge Form constraints
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

    //credit info and business rule engine
    creditCompany: "",
    cicProductCode: "",

    //business rule engine
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
    acceptedLatePayment: "",
    minCreditEnquiries: "",
    maxCreditEnquiries: "",

    //sorce of funds
    sourceOfFunds: "",
    coLendingFacility: "",
    firstNBFC: "",
    firstNBFCShare: "",
    secondNBFC: "",
    secondNBFCShare: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "poolingDates") {
      setFormData((prev) => ({
        ...prev,
        poolingDates: checked
          ? [...prev.poolingDates, value]
          : prev.poolingDates.filter((date) => date !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // send your form data to backend
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Data stored successfully:", result);
        alert("Data stored successfully in the database!");
        setSubmitted(true);
      } else {
        console.error("Error storing data:", result);
        alert("Failed to store data. Please check the console for details.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred while saving the data.");
    }
  };

  const renderDropdown = (label, name, options = []) => (
    <div className="flex flex-col w-full px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="border rounded px-3 py-2"
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
              className="accent-blue-600"
            />
            {opt}
          </label>
        ))}
      </div>
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
      <div className="flex flex-wrap gap-3 sm:gap-4">
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

  const renderManualInput = (label, name, suffix = "") => (
    <div className="flex flex-col px-2">
      <label className="text-sm text-left font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`Enter value${suffix}`}
        className="border rounded px-3 py-2"
      />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="container mx-auto px-4 py-8 bg-white rounded shadow-lg w-full max-w-none"
      >
        {/* Product Basic Details */}
        <h2 className="text-2xl font-bold mb-6 text-[#4635FE] text-left">
          Product Basic Details
        </h2>
        <hr className="mb-5"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderDropdown("Product Category", "productCategory")}
          <div className="flex flex-col w-full px-2">
            <label className="text-sm text-left font-medium mb-1">
              Name of Product
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              readOnly
              className="border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          {renderDropdown("Repayment Category", "repaymentCategory")}
          {renderDropdown("Term Category", "termCategory")}
          {renderDropdown("Min. Loan Tenure Permitted (Month)", "minTenure")}
          {renderDropdown("Max. Loan Tenure Permitted (Month)", "maxTenure")}
          {renderDropdown("Bullet Loan Tenure Permitted", "bulletTenure")}
          {renderDropdown("Min. Loan Amount Permitted", "minAmount")}
          {renderDropdown("Max. Loan Amount Permitted", "maxAmount")}
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
          {renderYesNo("Asset Classification Permitted", "assetClassification")}
          {renderYesNo("Tranches", "tranches")}
          {renderYesNo("General Insurance Applicable", "generalInsurance")}
          {renderYesNo("Health Insurance Applicable", "healthInsurance")}
          {renderYesNo("Life Insurance Applicable", "lifeInsurance")}
          {renderYesNo("NPA Rules Applicable", "npaRules")}
          {renderYesNo("Write-off Rules Applicable", "writeOffRules")}
          {renderYesNo("Settlement Rule Applicable", "settlementRules")}
        </div>
        <hr className="mb-10"></hr>

        {/* ROI & Repayment Settings */}
        <h2 className="text-2xl font-bold mb-6 text-[#4635FE] text-left">
          ROI & Repayment Settings
        </h2>
        <hr className="mb-5"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col px-2">
            <label className="text-sm text-left font-medium mb-1">
              Rate of Interest
            </label>
            <select
              name="rateOfInterest"
              value={formData.rateOfInterest}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Fixed">Fixed</option>
              <option value="Floating">Floating</option>
            </select>
          </div>
          {renderRadioGroup(
            "Interest Rate Methodology",
            "interestMethodology",
            ["Reducing", "Flat", "Hybrid"]
          )}
          {renderAmortizationRadioGroup(
            "Amortization Method",
            "amortizationMethod",
            ["Regular EMI", "Customized EMI", "Bullet Payment"]
          )}
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
              className="border rounded px-3 py-2"
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
              className="border rounded px-3 py-2"
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
              className="border rounded px-3 py-2"
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
          <label className="text-sm text-left font-medium mb-2">
            Repayment Pooling Dates
          </label>
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 lg:grid-cols-15 gap-6 mb-8">
            {Array.from({ length: 31 }, (_, i) => {
              const day = String(i + 1).padStart(2, "0");
              return (
                <label key={day} className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="poolingDates"
                    value={day}
                    checked={formData.poolingDates.includes(day)}
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
              className="border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>
        </div>
        <hr className="mb-10"></hr>

        {/* Applicable Fees & Charges */}
        <h2 className="text-2xl font-bold mb-6 text-[#4635FE] text-left">
          Applicable Fees & Charges
        </h2>
        <hr className="mb-5"></hr>

        {/* Upfront Charges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 mr-10">
            Applicable Upfront Charges
          </h3>
          {/* <div className="grid grid-cols-3 gap-10"> */}
          {renderYesNo("Processing Fee", "processingFee")}
          {renderManualInput(
            "Manually Enter Processing Fee in %",
            "manualProcessingFee",
            " (%)"
          )}
          {renderYesNo("GST on Processing Fee", "gstOnProcessingFee")}
          {/* </div> */}
        </div>

        {/* Convenience Fee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <h3 className="text-lg text-left font-semibold mb-4 mr-10">
            Applicable Convenience Fee
          </h3>
          {/* <div className="grid grid-cols-3 gap-10"> */}
          {renderYesNo("Convenience Fee", "convenienceFee")}
          {renderManualInput(
            "Manually Enter Convenience Fee in %",
            "manualConvenienceFee",
            " (%)"
          )}
          {renderYesNo("GST on Convenience Fee", "gstOnConvenienceFee")}
          {/* </div> */}
        </div>

        {/* Incidental Charges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <h3 className="text-lg text-left font-semibold mb-4 mr-10">
            Applicable Incidental Charges
          </h3>
          {/* <div className="grid grid-cols-3 gap-10"> */}
          {renderYesNo("EMI Bouncing Charges", "emiBouncingCharges")}
          {renderManualInput(
            "Manually Enter EMI Bouncing Charges",
            "manualEmiBouncingCharges"
          )}
          {renderYesNo(
            "GST on EMI Bouncing Charges",
            "gstOnEmiBouncingCharges"
          )}
          {/* </div> */}
        </div>

        {/* Late Payment Charges Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <h3 className="text-lg text-left font-semibold mb-4 mr-10">
            Select Applicable Late Payment Charges Method
          </h3>
          {/* <div className="grid grid-cols-3 gap-10"> */}
          <div className="flex flex-col px-2 col-span-1">
            <select
              name="latePaymentMethod"
              value={formData.latePaymentMethod}
              onChange={handleChange}
              className="border  rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Flat">Flat</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          {/* </div> */}
        </div>

        {/* Daily Late Payment Charges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 mr-10">
            Daily Late Payment Charges
          </h3>
          {/* <div className="grid grid-cols-3 gap-10"> */}
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
          {/* </div> */}
        </div>

        {/* Monthly Late Payment Charges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <h3 className="text-lg text-left font-semibold mb-4 mr-10">
            Monthly Late Payment Charges
          </h3>
          {/* <div className="grid grid-cols-3 gap-10"> */}
          {renderYesNo("Monthly Late Payment Charges", "monthlyLateCharges")}
          {renderManualInput(
            "Manually Enter Monthly Late Payment Charges",
            "manualMonthlyLateCharges"
          )}
          {renderYesNo(
            "GST on Monthly Late Payment Charges",
            "gstOnMonthlyLateCharges"
          )}
          {/* </div> */}
        </div>
        <hr className="mb-10"></hr>

        {/* credit info company*/}

        {/* Section 1: Credit Information Company */}
        <h2 className="text-2xl font-bold text-left mb-6 text-[#4635FE]">
          Credit Information Company & Product Code
        </h2>
        <hr className="mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderDropdown(
            "Select Credit Information Company",
            "creditCompany",
            ["CIBIL", "Experian", "Equifax", "CRIF"]
          )}
          {renderDropdown("Select CIC Product Code", "cicProductCode", [
            "Code 1",
            "Code 2",
            "Code 3",
          ])}
        </div>

        {/* Section 2: Business Rule Engine */}
        <h2 className="text-2xl font-bold mb-6 text-left text-[#4635FE]">
          Business Rule Engine – Credit Approval Decision
        </h2>
        <hr className="mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderDropdown("Product Category", "productCategory", [
            "Loan",
            "Credit",
          ])}
          <div className="flex flex-col px-2 w-full">
            <label className="text-sm text-left font-medium mb-1">
              Name of Product
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              readOnly
              className="border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          {renderDropdown("Min Borrowers Age Required", "minAge", [
            "18",
            "19",
            "20",
            "21",
          ])}
          {renderDropdown("Max Borrowers Age Allowed", "maxAge", [
            "55",
            "56",
            "57",
            "58",
            "59",
            "60",
            "61",
            "62",
            "63",
            "64",
            "65",
          ])}
          {renderDropdown("Borrowers Type of Income Source", "incomeSource", [
            "Salaried",
            "Self-employed",
            "Pension",
          ])}
          {renderDropdown(
            "Borrowers Income Requirements",
            "incomeRequirement",
            ["> ₹25,000", "> ₹50,000", "> ₹75,000"]
          )}
          {renderDropdown("FOIR (%)", "foir", [
            "40%",
            "45%",
            "50%",
            "55%",
            "60%",
            "65%",
            "70%",
            "75%",
          ])}
          {renderYesNo("-1 Credit Score Eligibility", "minusOneScoreEligible")}
          {renderDropdown("Minimum Credit Score Required", "minCreditScore", [
            "650",
            "665",
            "680",
            "690",
            "700",
            "730",
            "750",
          ])}
          {renderDropdown(
            "In Between Credit Score Required",
            "inBetweenCreditScore",
            ["660-700", "670-720", "680-730"]
          )}
          {renderDropdown(
            "Eligibility Based on Credit Score",
            "creditScoreEligibility",
            ["Strict", "Flexible"]
          )}
          {renderYesNo("Over Due Acceptable", "overdueAcceptable")}
          {renderDropdown(
            "Accepted Late Payment in Credit Score",
            "acceptedLatePayment",
            Array.from({ length: 11 }, (_, i) => `${i}`)
          )}
          {renderDropdown(
            "Min Credit Enquiries Accepted",
            "minCreditEnquiries",
            ["0", "1"]
          )}
          {renderDropdown(
            "Max Credit Enquiries Accepted",
            "maxCreditEnquiries",
            Array.from({ length: 11 }, (_, i) => `${i}`)
          )}
        </div>
        <hr className="mb-10"></hr>

        {/*source of funds*/}
        <h2 className="text-2xl font-bold text-left mb-6 text-[#4635FE]">
          Source of Funds
        </h2>
        <hr className="mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderDropdown("Source of Funds", "sourceOfFunds", [
            "Bank",
            "NBFC",
            "Private Equity",
            "Other",
          ])}
          {renderYesNo("Co-Lending Facility", "coLendingFacility")}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderDropdown("Select 1st Co-Lending NBFC", "firstNBFC", [
            "NBFC A",
            "NBFC B",
            "NBFC C",
          ])}
          {renderDropdown(
            "Select 1st Co-Lending NBFC Share %",
            "firstNBFCShare",
            ["10%", "20%", "30%", "40%", "50%"]
          )}
          {renderDropdown("Select 2nd Co-Lending NBFC", "secondNBFC", [
            "NBFC X",
            "NBFC Y",
            "NBFC Z",
          ])}
          {renderDropdown(
            "Select 2nd Co-Lending NBFC Share %",
            "secondNBFCShare",
            ["10%", "20%", "30%", "40%", "50%"]
          )}
        </div>

        {/* product activation*/}

        <h2 className="text-2xl font-bold text-left mb-6 text-[#4635FE]">
          Product Activation
        </h2>
        <hr className="mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderDropdown("Status of Product", "firstNBFC", [
            "NBFC A",
            "NBFC B",
            "NBFC C",
          ])}
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
  );
};
export default ProductBasicDetailsForm;

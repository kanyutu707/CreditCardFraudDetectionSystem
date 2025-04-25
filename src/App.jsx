
import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    trans_date_trans_time: "",
    cc_num: "",
    merchant: "",
    category: "",
    amt: "",
    first: "",
    last: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    long: "",
    city_pop: "",
    job: "",
    dob: "",
    trans_num: "",
    unix_time: "",
    merch_lat: "",
    merch_long: ""
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload = {
      ...formData,
      cc_num: parseFloat(formData.cc_num),
      amt: parseFloat(formData.amt),
      zip: parseInt(formData.zip),
      lat: parseFloat(formData.lat),
      long: parseFloat(formData.long),
      city_pop: parseInt(formData.city_pop),
      unix_time: parseInt(formData.unix_time),
      merch_lat: parseFloat(formData.merch_lat),
      merch_long: parseFloat(formData.merch_long)
    }
    
    try {
      const response = await fetch('http://localhost:9030/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fillSampleData = () => {
    setFormData({
      trans_date_trans_time: "2019-01-01 00:00:00",
      cc_num: "3.560730e+15",
      merchant: "fraud_Rippin, Kub and Mann",
      category: "misc_net",
      amt: "24.84",
      first: "Jennifer",
      last: "Banks",
      gender: "F",
      street: "561 Perry Cove",
      city: "Moravian Falls",
      state: "NC",
      zip: "28654",
      lat: "31.8599",
      long: "-102.7413",
      city_pop: "3495",
      job: "Psychologist, counselling",
      dob: "1988-03-09",
      trans_num: "2e12ohf49dsb2e12ohf49dsc",
      unix_time: "1371852399",
      merch_lat: "32.575873",
      merch_long: "-102.60429"
    })
  }

  return (
    <div className="container">
      <h1>Fraud Detection System</h1>
      
      <div className="form-container">
        <div className="form-header">
          <h2>Transaction Information</h2>
          <button type="button" onClick={fillSampleData} className="sample-btn">
            Fill with Sample Data
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="trans_date_trans_time">Transaction Date & Time</label>
              <input
                type="text"
                id="trans_date_trans_time"
                name="trans_date_trans_time"
                value={formData.trans_date_trans_time}
                onChange={handleChange}
                placeholder="YYYY-MM-DD HH:MM:SS"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cc_num">Credit Card Number</label>
              <input
                type="text"
                id="cc_num"
                name="cc_num"
                value={formData.cc_num}
                onChange={handleChange}
                placeholder="Credit Card Number"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="merchant">Merchant</label>
              <input
                type="text"
                id="merchant"
                name="merchant"
                value={formData.merchant}
                onChange={handleChange}
                placeholder="Merchant Name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Transaction Category"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="amt">Amount</label>
              <input
                type="number"
                id="amt"
                name="amt"
                value={formData.amt}
                onChange={handleChange}
                placeholder="Transaction Amount"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="first">First Name</label>
              <input
                type="text"
                id="first"
                name="first"
                value={formData.first}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="last">Last Name</label>
              <input
                type="text"
                id="last"
                name="last"
                value={formData.last}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street Address"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="number"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder="Latitude"
                step="0.000001"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="long">Longitude</label>
              <input
                type="number"
                id="long"
                name="long"
                value={formData.long}
                onChange={handleChange}
                placeholder="Longitude"
                step="0.000001"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="city_pop">City Population</label>
              <input
                type="number"
                id="city_pop"
                name="city_pop"
                value={formData.city_pop}
                onChange={handleChange}
                placeholder="City Population"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="job">Job</label>
              <input
                type="text"
                id="job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="Job Title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="text"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="trans_num">Transaction Number</label>
              <input
                type="text"
                id="trans_num"
                name="trans_num"
                value={formData.trans_num}
                onChange={handleChange}
                placeholder="Transaction Number"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="unix_time">Unix Time</label>
              <input
                type="number"
                id="unix_time"
                name="unix_time"
                value={formData.unix_time}
                onChange={handleChange}
                placeholder="Unix Timestamp"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="merch_lat">Merchant Latitude</label>
              <input
                type="number"
                id="merch_lat"
                name="merch_lat"
                value={formData.merch_lat}
                onChange={handleChange}
                placeholder="Merchant Latitude"
                step="0.000001"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="merch_long">Merchant Longitude</label>
              <input
                type="number"
                id="merch_long"
                name="merch_long"
                value={formData.merch_long}
                onChange={handleChange}
                placeholder="Merchant Longitude"
                step="0.000001"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Analyzing...' : 'Detect Fraud'}
          </button>
        </form>
      </div>
      
      {error && (
        <div className="error-msg">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className={`result ${result.is_fraud ? 'fraud' : 'legitimate'}`}>
          <h2>Analysis Result</h2>
          <div className="result-content">
            <p className="prediction">
              This transaction is: <strong>{result.is_fraud ? 'FRAUDULENT' : 'LEGITIMATE'}</strong>
            </p>
            {result.confidence !== null && (
              <p className="confidence">
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
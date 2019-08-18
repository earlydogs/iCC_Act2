import React from 'react';
var bigDecimal = require('js-big-decimal');


class ICC extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      current_balance: null,
      monthly_addition: null,
      interest_rate_year: null,
      period_year: null,
      isSubmitted:false,
      interest_rate_month: null,
      asshole_final_balance: null,
      simple_interest_balance: null,
      compound_interest_balance: null,
      compound_calculation_balance: null,
    };
  }
  
  /* 元本（万円）*/
  handleCurrentBalanceChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      current_balance: inputValue,
      hasCurrentBalanceError: isEmpty,
    });
  }

  /* 毎月積立（万円）*/
  handleMonthlyAdditionChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      monthly_addition: inputValue,
      hasMonthlyAdditionError: isEmpty,
    });
  }

  /* 年利（％）*/
  handleInterestRateYearChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      interest_rate_year: inputValue,
      interest_rate_month: (1+(inputValue/100))**(0.08333),
      hasInterestRateYearError: isEmpty,
    });
  }

  /* 投資期間（年）*/
  handlePeriodYearChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      period_year: inputValue,
      hasPeriodYearError: isEmpty,
    });
  }
  /*複利計算処理*/
  calcCompaundLogic(){

    let currentBalance = new bigDecimal(this.state.current_balance);
    let monthlyAddition = new bigDecimal(this.state.monthly_addition);
    let interestRateYear = new bigDecimal(this.state.interest_rate_year);
    let periodYear = new bigDecimal(this.state.period_year);
    let interestRateMonth = new bigDecimal(this.state.interest_rate_month);




    console.log(currentBalance.getValue());
    console.log(monthlyAddition.getValue());
    console.log(interestRateYear.getValue());
    console.log(interestRateMonth.getValue());
    console.log(periodYear.getValue());
    
    return this.currentBalance;
  }




  /* 複利計算ボタンを押下した際の処理*/
  handleSubmit() {
    this.calcCompaundLogic();
    this.setState({isSubmitted: true});
    
  }

  /* メイン処理 */
  render(){
    let displayResult;
    let displayGraphChart;

    if(this.state.isSubmitted){
      displayResult =(
        <div className="col shadow py-3 mb-3 mt-4 rounded">
          <font size="5">  
            <div className="row mb-1">
              <div className="col-6 text-right">投資総額：</div>
              <div className="col-6 text-left">{this.state.current_balance}万円</div>
            </div>
            <div className="row mb-1">
              <div className="col-6 text-right">最終金額：</div>
              <div className="col-6 text-left"><font color="blue">{this.state.interest_rate_month}</font></div>
            </div>
            <div className="row mb-1">
              <div className="col-6 text-right">増加率　：</div>
              <div className="col-6 text-left"><font color="blue">％</font></div>
            </div>
          </font>
        </div>
      )
      displayGraphChart =(
        <div className="col-xl-8">
          <div className="container-fluid">
            <div className="col mb-4 shadow mt-2 pt-2 pb-4 rounded">
              ここにグラフが出る
            </div>
            <div className="col mb-4 shadow mt-2 pt-2 pb-4 rounded">
              ここに表テーブルが出る
            </div>
          </div>
        </div>
      )
    }



    return(
      <div className="row no-gutters">
        <div className="col-xl-4">
          <div className="container-fluid">
            <div className="col shadow rounded">
              <form>
                <div className="form-group row mb-3 mt-2 pt-3">
                  <label className="col-6 col-form-label text-right" for="current_balance">元本（万円）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="current_balance" 
                      name="current_balance" 
                      placeholder ="元本（万円）" 
                      value={this.state.current_balance}
                      onChange={(event) => {this.handleCurrentBalanceChange(event)}}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-6 col-form-label text-right" for="monthly_addition">毎月積立（万円）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="monthly_addition" 
                      name="monthly_addition" 
                      placeholder ="毎月積立（万円）" 
                      value={this.state.monthly_addition}
                      onChange={(event) => {this.handleMonthlyAdditionChange(event)}}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-6 col-form-label text-right" for="interest_rate_year">年利（％）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="interest_rate_year" 
                      name="interest_rate_year" 
                      placeholder ="年利（％）" 
                      value={this.state.interest_rate_year}
                      onChange={(event) => {this.handleInterestRateYearChange(event)}}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-6 col-form-label text-right" for="period_year">投資期間（年）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="period_year" 
                      name="period_year" 
                      placeholder ="投資期間（年）" 
                      value={this.state.period_year}
                      onChange={(event) => {this.handlePeriodYearChange(event)}}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-lg btn-primary w-100 mb-4"
                  onClick={() => {this.handleSubmit()}}
                >
                  複利計算
                </button>
              </form>
            </div>
            {displayResult}     
          </div>
        </div>
        {displayGraphChart}
      </div>
    );
  }
}
export default ICC;
import React from 'react';
var bigDecimal = require('js-big-decimal');


class ICC extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      currentBalance: null,                                          /* 元本 */
      monthlyAddition: null,                                         /* 毎月積立 */
      interestRateYear: null,                                        /* 年利 */
      periodYear: null,                                              /* 投資期間 */
      isSubmitted:false,                                             /* ボタンを押したかどうか */
      interestRateMonth: null,                                       /* 月利 */
      assholeFinalBalance: null,                                     /* タンス預金 最終金額 */
      simpleFinalBalance: null,                                      /* 単利 　　　最終金額 */
      compoundFinalBalance: null,                                    /* 複利 　　　最終金額 */
    };
  }
  
  /* 元本（万円）インプット */
  handleCurrentBalanceChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      currentBalance: inputValue,
      hasCurrentBalanceError: isEmpty,
    });
  }

  /* 毎月積立（万円）インプット */
  handleMonthlyAdditionChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      monthlyAddition: inputValue,
      hasMonthlyAdditionError: isEmpty,
    });
  }

  /* 年利（％）インプット */
  handleInterestRateYearChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      interestRateYear: inputValue,
      interestRateMonth: Math.round(((1+(inputValue/100))**(0.08333))*10000)/10000,
      hasInterestRateYearError: isEmpty,
    });
  }

  /* 投資期間（年）インプット */
  handlePeriodYearChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      periodYear: inputValue,
      hasPeriodYearError: isEmpty,
    });
  }
  /*複利計算処理*/
  calcCompaundLogic(){


    /* パラメータ準備 */
    let ganpon = new bigDecimal(this.state.currentBalance);
    let tsumitate = new bigDecimal(this.state.monthlyAddition);
    let nenri = new bigDecimal(this.state.interestRateYear/100);
    let toushiKikan = new bigDecimal(this.state.periodYear);
    let getsuri = new bigDecimal(this.state.interestRateMonth);


    /* 配列準備　INITIALIZE*/
    let tansuYokin = [];
    let tanriKingaku = [];
    let fukuriKingaku = [];
    let compoundCalculationBalance = [];
    tansuYokin.push(ganpon.getValue());
    tanriKingaku.push(ganpon.getValue());
    fukuriKingaku.push(ganpon.getValue());
    compoundCalculationBalance.push(ganpon.getValue());

    /*
    console.log(ganpon.getValue());
    console.log(tsumitate.getValue());
    console.log(nenri.getValue());
    console.log(toushiKikan.getValue());
    console.log(getsuri.getValue());
    */

    /* 単利計算 */
    let countSimple = 1;
    for (countSimple; countSimple <= toushiKikan.getValue(); countSimple++) {
      const sumSoukin = new bigDecimal(tsumitate.getValue()*12*countSimple)
      tansuYokin[countSimple] = ganpon.add(sumSoukin);

      let simpleKinri = new bigDecimal(countSimple*ganpon.getValue()*nenri.getValue());
      tanriKingaku[countSimple] = ganpon.add(sumSoukin.add(simpleKinri));
      console.log(`${countSimple}年目`);
      console.log(`タンス預金：${tansuYokin[countSimple].getPrettyValue()}万円`);
      console.log(`単利　　　：${tanriKingaku[countSimple].getPrettyValue()}万円`);
    }

    /* 複利計算 */
    const timeMonth = new bigDecimal('12');
    let maxCount = toushiKikan.multiply(timeMonth);
    let fukuriTimes = 0;
    for (let countCompound = 1; countCompound <= maxCount.getValue(); countCompound++) {
      console.log(`${countCompound}ヶ月目`);
      console.log(`前月：${compoundCalculationBalance[countCompound-1]}万円`);

      const zengetsuKingaku = new bigDecimal(compoundCalculationBalance[countCompound-1]);
      const zengetsuKingakuCalc = getsuri.multiply(zengetsuKingaku.add(tsumitate));
      compoundCalculationBalance[countCompound] = Math.ceil(zengetsuKingakuCalc.getValue()*1000)/1000;

      console.log(zengetsuKingaku);
      console.log(zengetsuKingakuCalc);
      console.log(compoundCalculationBalance[countCompound]);

      if(countCompound % 12 === 0){
        fukuriTimes ++;
        fukuriKingaku[fukuriTimes] = Math.ceil(compoundCalculationBalance[countCompound]*10)/10;
        console.log(`${countCompound}だよお`);
        console.log(fukuriKingaku[fukuriTimes]);
      }


    }
    console.log(countSimple);
    console.log(fukuriTimes);    
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
              <div className="col-6 text-left">{this.state.currentBalance}万円</div>
            </div>
            <div className="row mb-1">
              <div className="col-6 text-right">最終金額：</div>
              <div className="col-6 text-left"><font color="blue">{this.state.interestRateMonth}</font></div>
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
                  <label className="col-6 col-form-label text-right" for="currentBalance">元本（万円）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="currentBalance" 
                      name="currentBalance" 
                      placeholder ="元本（万円）" 
                      value={this.state.currentBalance}
                      onChange={(event) => {this.handleCurrentBalanceChange(event)}}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-6 col-form-label text-right" for="monthlyAddition">毎月積立（万円）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="monthlyAddition" 
                      name="monthlyAddition" 
                      placeholder ="毎月積立（万円）" 
                      value={this.state.monthlyAddition}
                      onChange={(event) => {this.handleMonthlyAdditionChange(event)}}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-6 col-form-label text-right" for="interestRateYear">年利（％）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="interestRateYear" 
                      name="interestRateYear" 
                      placeholder ="年利（％）" 
                      value={this.state.interestRateYear}
                      onChange={(event) => {this.handleInterestRateYearChange(event)}}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-6 col-form-label text-right" for="periodYear">投資期間（年）</label>
                  <div className="col-6">
                    <input 
                      className="form-control" 
                      type="tel" 
                      pattern="-?[0-9]*(\.[0-9]+)?" 
                      id="periodYear" 
                      name="periodYear" 
                      placeholder ="投資期間（年）" 
                      value={this.state.periodYear}
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
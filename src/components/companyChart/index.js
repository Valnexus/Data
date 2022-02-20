import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { importCompanies } from "../../api/FetchData";

const CompanyChart = () => {
    const { symbol } = useParams();
    const [loading, setLoading] = useState({
        loading: false,
        text: 'Loading chart ...'
    });
    const [options, setOptions] = useState({
        rangeSelector: {
            selected: 1,
        },
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }

    });
    function toDateTime(date) {
        var t = new Date(date);
        t = t.getTime();
        return t;
    };

    useEffect(()=>{
        if(symbol !== undefined) {
            setLoading({...loading, loading: true});
            importCompanies(`/stock/${symbol}/chart/5y`).then(res=>{
                if(res !== undefined) {
                    let dataInfo = res.data;
                    let detailsClose = [];
                    let detailsVolume = [];
                    let i = 0;

                    for (i; i < dataInfo.length; i += 1) {
                        detailsClose.push([
                            toDateTime(dataInfo[i].date),
                            dataInfo[i].close
                        ]);
                        detailsVolume.push([
                            toDateTime(dataInfo[i].date),
                            dataInfo[i].volume
                        ]);
                    };
                    setOptions({...options,               
                        title: {
                            text: dataInfo[0].symbol,
                            align: 'left',
                            style: {"fontSize": "25px", "fontWeight": "bold"}
                        },
                        series: [{
                            type: 'line',
                            id: dataInfo[0].symbol + '-line',
                            name: dataInfo[0].symbol + ' Close Price',
                            data: detailsClose
                        }, {
                            type: 'column',
                            id: (dataInfo[0].symbol).toLowerCase() + '-volume',
                            name: dataInfo[0].symbol + ' Volume',
                            data: detailsVolume,
                            yAxis: 1
                        }],
                    });
                    setLoading({...loading, loading: false});
                } else {
                    setLoading({loading: true, text: "This company does not exist, please choose another."});
                }
            })
        } else {
            setLoading({loading: true, text: 'Please choose a company from the list.'});;
        };
    },[symbol]);

    return (
        loading.loading ? <h3 style={{textAlign: 'center'}}>{loading.text}</h3> : 
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        /> 
    )
};

export default CompanyChart;
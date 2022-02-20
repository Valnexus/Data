import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { importCompanies } from "../../api/FetchData";
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { saveCompanies } from "../../store/slices/companiesSlice";

const CompaniesTable = () => {
    const stateCompanies = useSelector((state) => state.companies.companies);
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]);
    const [pageSize, setPageSize] = useState(50);

    const columns = [{
            title: 'Company Name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
            },
            width: 40,
            render: (text, record) => <Link to={'/charts/' + record.symbol}>{text}</Link>,
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            width: 20
        },
        {
            title: 'Market Cap.',
            dataIndex: 'marketCap',
            sorter: {
                compare: (a, b) => a.marketCapFilter - b.marketCapFilter,
            },
            width: 20
        },
        {
            title: 'Change',
            dataIndex: 'change',
            width: 20
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        setPageSize(pagination.pageSize);
    };

    function marketCapFormat(num, digits) {
        const lookup = [{
                value: 1e6,
                symbol: "M"
            },
            {
                value: 1e9,
                symbol: "B"
            },
            {
                value: 1e12,
                symbol: "T"
            }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + " " + item.symbol : "0";
    };

    useEffect(() => {
        if(!stateCompanies.length) {
            importCompanies('/stock/market/list/mostactive', 100).then(data => {
                let loadCompanies = [];
                let result = data.data;
                result.forEach((item, index) => {
                    let company = {
                        key: index + 1,
                        name: item.companyName,
                        symbol: item.symbol,
                        marketCap: '$' + marketCapFormat(item.marketCap, 3),
                        marketCapFilter: item.marketCap,
                        change: item.change + '%',
                    }
                    loadCompanies.push(company);
                });
                setCompanies(loadCompanies);
                dispatch(saveCompanies(loadCompanies));
            })
        } else {
            setCompanies(stateCompanies);
        }
    }, []);

    return ( <Table columns = {columns} dataSource = {companies} onChange = {onChange} pagination = {{pageSize}} />)
};

export default CompaniesTable;
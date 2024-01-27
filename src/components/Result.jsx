import { useContext } from "react";
import MainScreenContext from "../screens/MainScreen/MainScreenContextProvider";
import { Button, Card, Row, Table, Typography } from "antd";
import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function Result() {
    const pageContext = useContext(MainScreenContext);
    const tableColumns = [
        {
            title: 'Number',
            dataIndex: 'number',
        },
        {
            title: 'CorrectAnswer',
            dataIndex: 'correctAnswer',
        },
        {
            title: 'YourAnswer',
            dataIndex: 'yourAnswer',
        },
        {
            title:'IsCorrect',
            dataIndex:'isCorrect',
            render:function(text, record, index) {
                return record.isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />
            }
        }
    ]
    const getTitle = () => {
        return (
            <Typography.Title level={4}>Results</Typography.Title>
        )
    }
    return (
        <Row justify={"center"} > 
            <Card title={getTitle()}>
                <Table style={
                    {width:'80em'}
                } bordered columns={tableColumns} dataSource={pageContext.resultsState?.resultList} pagination={false}/>
                <Row align={"middle"} justify={"space-between"}>
                <Typography.Text>{`You answered ${pageContext.resultsState?.correctCount} out of 10 questions correctly`}</Typography.Text>
                <Button onClick={() => pageContext.clear()}>Return To Start Page</Button>
                </Row>
            </Card>
        </Row>
    )
} 
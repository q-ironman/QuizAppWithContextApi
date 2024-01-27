import { Button, Card, Col, Layout, Radio, Row, Space, Statistic, Typography, message } from "antd";
import { useContext, useEffect, useState } from "react";
import MainScreenContext from "../screens/MainScreen/MainScreenContextProvider";
import { RightOutlined } from "@ant-design/icons";

const { Countdown } = Statistic
export default function Question() {
    const pageContext = useContext(MainScreenContext);

    useEffect(() => {
        pageContext.setSelected(undefined)
        pageContext.setCountDown(Date.now() + 30 * 1000)
    }, [pageContext.currentQuestion])

    const onChangeCountDown = (val) => {
        if (val < 20000) {
            pageContext.setIsRadioGroupDisabled(false)
        }
    }
    const onFinishCountDown = () => {
        message.error("Finished")
        pageContext.saveAndMoveNextQuestion(pageContext.selected, pageContext.currentQuestion.id)
    }
    const onChange = (e) => {
        pageContext.setSelected(e?.target?.value)
    }
    const nextQuestionOnClick = () => {
        pageContext.saveAndMoveNextQuestion(pageContext.selected, pageContext.currentQuestion.id)
    }
    const getTitle = () => {
        return (
            <>
                <Typography.Title level={4}>Question:</Typography.Title>
                <Typography.Text>{pageContext.currentQuestion.question}</Typography.Text>
            </>
        )
    }
    return (
        <Col style={{ paddingTop: '1em' }}>
            <Row gutter={[16]}>
                <Col span={22}>
                    <Card style={{ minHeight: '80vh' }} title={getTitle()}>

                        <Row justify={"space-between"}>
                            <Radio.Group disabled={pageContext.isRadioGroupDisabled} onChange={e => onChange(e)} value={pageContext.selected}>
                                <Space direction="vertical">
                                    <Radio value={'A'}>{pageContext.currentQuestion.A}</Radio>
                                    <Radio value={'B'}>{pageContext.currentQuestion.B}</Radio>
                                    <Radio value={'C'}>{pageContext.currentQuestion.C}</Radio>
                                    <Radio value={'D'}>{pageContext.currentQuestion.D}</Radio>
                                </Space>
                            </Radio.Group>
                            <Countdown title="Countdown" value={pageContext.countDown} onChange={onChangeCountDown} onFinish={onFinishCountDown} />
                        </Row>
                    </Card>
                </Col>
                <Col span={2}>
                    <Card style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Row justify={"center"}>
                            <Button onClick={nextQuestionOnClick}><RightOutlined /></Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}
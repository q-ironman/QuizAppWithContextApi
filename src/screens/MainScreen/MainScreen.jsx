import { Button, Card, Col, Row, Space, Spin, Switch, Typography } from "antd";
import { useContext, useEffect } from "react";
import MainScreenContext from "./MainScreenContextProvider";
import StartQuiz from "../../components/StartQuiz"
import Question from "../../components/Question";
import Result from "../../components/Result";



export default function MainScreen() {

    const pageContext = useContext(MainScreenContext);
    const handleThemeSwitchChange = (checked) => {
        pageContext.setIsDarkTheme(checked)
    }

    useEffect(() => {
        document.body.classList = pageContext.isDarkTheme ? 'black' : 'white'
    }, [pageContext.isDarkTheme])
        return (
            <Spin spinning={pageContext.isLoading} size="large" >
                <Col>
                    <Row justify={"end"}>
                        <Switch value={pageContext.isDarkTheme} onChange={(checked) => handleThemeSwitchChange(checked)}></Switch>
                    </Row>
                    {pageContext.isHomeOpen && <StartQuiz/>}
                    {pageContext.isQuestionsOpen && <Question/>}
                    {pageContext.isScoreboardOpen && <Result/>}
                </Col>
            </Spin>
        )
}
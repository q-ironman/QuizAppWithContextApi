import { useContext } from "react"
import MainScreenContext from "../screens/MainScreen/MainScreenContextProvider"
import { Button, Card, Col, Row } from "antd";

export default function StartQuiz() {
    const pageContext = useContext(MainScreenContext);
    return (
        <Col className="home-card-col">
            <Card title='Welcome To Quiz App'>
                <Row justify={"center"}>
                    <Button type="primary" onClick={() => pageContext.handleStartQuizButtonOnClick()}>
                        Start Quiz
                    </Button>
                </Row>
            </Card>
        </Col>
    )
}
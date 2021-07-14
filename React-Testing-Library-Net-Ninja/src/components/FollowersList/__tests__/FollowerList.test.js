import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import FollowersList from "../FollowersList"

const MockedFollowerList = () => (
    <BrowserRouter>
        <FollowersList />
    </BrowserRouter>
)

describe('test FollowerList', () => {
    it('should render follower', async () => {
        render(<MockedFollowerList />)

        const element = await screen.findByTestId(/follower-item-0/i)
        expect(element).toBeInTheDocument()
    })
})
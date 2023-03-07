import { render, screen } from '@testing-library/react'
import DateComponent from '@/components/date-component'
import '@testing-library/jest-dom'

describe('date-component', () => {
    it('renders formatted date given from props', () => {
        const sourceDate = "2023-01-20T07:34:44.464";
        render(<DateComponent dateString={sourceDate}/>)

        const heading = screen.getByText("2023-01-20 07:34:44")

        expect(heading).toBeInTheDocument()
    })
})
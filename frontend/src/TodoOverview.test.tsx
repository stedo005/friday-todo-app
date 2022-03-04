import {getByTestId, render, screen, waitFor} from "@testing-library/react";
import TodoOverview from "./TodoOverview";

test('check error handling for status not ok', async () => {

    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            ok: false
        } as Response)
    })

    render(<TodoOverview />);

    await waitFor(() => {
        expect(screen.getByTestId('errMsg').textContent).toEqual('Etwas ist schief gelaufen!')
    })

})

test('check error handling for status ok', async () => {

    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            ok: true
        } as Response)
    })

    render(<TodoOverview />);

    await waitFor(() => {
        expect(screen.getByTestId('errMsg').textContent).toEqual('')
    })

})

test('check error handling for addItem', async () => {


    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            ok: false
        } as Response)
    })

    render(<TodoOverview />);

    screen.getByTestId('addBtn').click()

    await waitFor(() => {
        expect(screen.getByTestId('errMsg').textContent).toEqual('Etwas ist schief gelaufen beim Item erstellen!')
    })

})
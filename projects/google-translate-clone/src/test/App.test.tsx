import {test, expect} from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'

test('My App works as expected', async () => {
    const user = userEvent.setup()
    const app = render(<App/>)

    const textAreaFrom = app.getByPlaceholderText('Intruducir texto')
    await user.type(textAreaFrom, 'Hola mundo')

    const result = await app.findByDisplayValue(/Hello world/i, {}, {timeout: 3000})

    expect(result).toBeTruthy()
});

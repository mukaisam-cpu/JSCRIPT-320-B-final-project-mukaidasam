import { expect, test } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import PaginationBar from '../components/PaginationBar'

test("Buttons greyed out and hidden on page 1 of 10", () => {
    render(<PaginationBar currentPage={1} pageCount={10} /> );

    const first = screen.queryByText("«");
    expect(first.parentElement.parentElement).toHaveClass('disabled');

    const back = screen.queryByText("‹");
    expect(back.parentElement.parentElement).toHaveClass('disabled');

    const backTwo = screen.queryByText("-2");
    expect(backTwo).toBeNull();

    const backOne = screen.queryByText("-1");
    expect(backOne).toBeNull();

    const current = screen.queryByText("1");
    expect(current.parentElement).toHaveClass('active');

    const forwardOne = screen.queryByText("2");
    expect(forwardOne).toHaveRole("button");

    const forwardTwo = screen.queryByText("3");
    expect(forwardTwo).toHaveRole("button");

    const lastPage = screen.queryByText("10");
    expect(lastPage).toHaveRole("button");

    const next = screen.queryByText("›");
    expect(next.parentElement).toHaveRole("button");

    const last = screen.queryByText("»");
    expect(last.parentElement).toHaveRole("button");
})
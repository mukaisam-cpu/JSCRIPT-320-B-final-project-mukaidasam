import { expect, test } from 'vitest'
import { screen, render } from '@testing-library/react'
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

test("Full button display on page 5 of 10", () => {
    const page = 5;
    const pageCount = 10;
    render(<PaginationBar currentPage={page} pageCount={pageCount} /> );

    const first = screen.queryByText("«");
    expect(first.parentElement).toHaveRole("button");

    const back = screen.queryByText("‹");
    expect(back.parentElement).toHaveRole("button");

    const firstPage = screen.queryByText("1");
    expect(firstPage).toHaveRole("button")

    const backTwo = screen.queryByText(page - 2);
    expect(backTwo).toHaveRole("button");

    const backOne = screen.queryByText(page - 1);
    expect(backOne).toHaveRole("button");

    const current = screen.queryByText(page);
    expect(current.parentElement).toHaveClass('active');

    const forwardOne = screen.queryByText(page + 1);
    expect(forwardOne).toHaveRole("button");

    const forwardTwo = screen.queryByText(page + 2);
    expect(forwardTwo).toHaveRole("button");

    const lastPage = screen.queryByText(pageCount);
    expect(lastPage).toHaveRole("button");

    const next = screen.queryByText("›");
    expect(next.parentElement).toHaveRole("button");

    const last = screen.queryByText("»");
    expect(last.parentElement).toHaveRole("button");
})

test("Buttons greyed out and hidden on page 10 of 10", () => {
    const page = 10;
    const pageCount = 10;
    render(<PaginationBar currentPage={page} pageCount={pageCount} /> );

    const first = screen.queryByText("«");
    expect(first.parentElement).toHaveRole("button");

    const back = screen.queryByText("‹");
    expect(back.parentElement).toHaveRole("button");

    const firstPage = screen.queryByText("1");
    expect(firstPage).toHaveRole("button")

    const backTwo = screen.queryByText(page - 2);
    expect(backTwo).toHaveRole("button");

    const backOne = screen.queryByText(page - 1);
    expect(backOne).toHaveRole("button");

    const current = screen.queryByText(page);
    expect(current.parentElement).toHaveClass('active');

    const forwardOne = screen.queryByText(page + 1);
    expect(forwardOne).toBeNull();

    const forwardTwo = screen.queryByText(page + 2);
    expect(forwardTwo).toBeNull();

    const next = screen.queryByText("›");
    expect(next.parentElement.parentElement).toHaveClass('disabled');

    const last = screen.queryByText("»");
    expect(last.parentElement.parentElement).toHaveClass('disabled');
})
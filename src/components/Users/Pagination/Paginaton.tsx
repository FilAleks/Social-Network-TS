import React, {ChangeEventHandler, FormEventHandler, MouseEventHandler, useState} from "react";
import s from './Pagination.module.css'

type PaginationPropsType = {
    totalPagesCount: number
    currentPage: number
    callBack: (pageNumber: number) => void
}

type PageType = { name: string, id: number }

export const Pagination: React.FC<PaginationPropsType> = ({
                                                              totalPagesCount,
                                                              currentPage,
                                                              callBack,
                                                          }) => {
    const [inputValue, setInputValue] = useState<number>(currentPage)

    const getPrepPagesArr = (totalPagesCount: number,
                             currentPage: number,
                             rangeBack: number,
                             rangeForward: number): PageType[] => {
        let res: PageType[] = []
        for (let i = currentPage - rangeBack; i <= currentPage + rangeForward; i++) {
            if (i >= 1 && i <= totalPagesCount) {
                res = [...res, {name: i.toString(), id: i}]
            }
        }

        res[0]
        && +res[0].id > 1
        && (res = [{name: 'First Page', id: 1}, ...res])

        res[0]
        && +res[res.length - 1].id < totalPagesCount
        && (res = [...res, {name: 'Last Page', id: totalPagesCount}])

        return res
    }

    const onClickHandler:MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault()
        const pageNumber = +e.currentTarget.id
        callBack(pageNumber)
        setInputValue(pageNumber)
    }

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const refineValue = (value: number): number => {
            if (value < 1) return 1
            if (value > totalPagesCount) return totalPagesCount
            return value
        }
        const value = +e.currentTarget.value
        setInputValue(refineValue(value))
    }

    const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        callBack(inputValue)
    }

    const getClassName = (m: number) => `${s.pageNumber} ${m === currentPage ? s.currentPageNumber : ''}`
    const paginationButtons = getPrepPagesArr(totalPagesCount, currentPage, 2, 5)
        .map(m => (
            <a href={'pageNumber'} key={m.id} id={m.id.toString()} className={getClassName(m.id)} onClick={onClickHandler}>
                {m.name}
            </a>
        ))

    return (
        <div className={s.pagination}>
            <div className={s.slider}>
                {paginationButtons}
            </div>
            <form onSubmit={onSubmitForm} className={s.form}>
                <input value={inputValue} onChange={onInputChange} type="number"/>
                <button>Go</button>
            </form>
        </div>
    )
}
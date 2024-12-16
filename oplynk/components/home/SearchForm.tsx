import Form from "next/form";
import {Search} from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query: string | null}) => {
    return (
        <div className="flex justify-center">
            <Form action="/" scroll={false} className="search-form">
            <input
                name="query"
                defaultValue={query || ''}
                placeholder="Search Sessions..."
                className="search-input"
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button type="submit" className="search-btn bg">
                    <Search className="size-6 text-white" />
                </button>
            </div>
        </Form>
        </div>
    )
}

export default SearchForm
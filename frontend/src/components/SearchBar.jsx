function SearchBar({ value, onChange }) {

    return (

        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search Projects..."
            className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            px-5
            py-3
            text-white
            focus:outline-none
            focus:border-purple-500
            "
        />

    );

}

export default SearchBar;
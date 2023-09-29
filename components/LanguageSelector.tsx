import data from "@/components/data.json";

export default function LanguageSelector({ setLanguage } : { setLanguage: Function } ) {
  const options = data.map((language) => {
    return (
      <option key={language.id} value={language.id}>
        {language.name}
      </option>
    );
  });

  return (
    <select
      id="language-selector"
      className="bg-[#333] rounded-lg px-4 py-2 my-2 self-end"
      onChange={(event) => setLanguage(event.target.value)}
    >
      <option defaultChecked value="auto">
        Automatic Detection
      </option>
      {options}
    </select>
  );
}

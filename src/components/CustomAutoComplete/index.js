import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

let timeoutId;
let abortController;
let newSearch = false;

const CustomAutoComplete = ({
  id,
  label,
  name,
  getMethod,
  required,
  noOptionsText,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const methods = useFormContext();

  const handleSearch = async (inputValue) => {
    clearTimeout(timeoutId);
    setLoading(true);
    newSearch = true;

    if (inputValue.trim() === "") {
      setOptions([]);
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 500);
      });

      newSearch = false;
      const result = await getMethod(inputValue, 500);

      if (!newSearch) {
        setOptions(result);
        setLoading(false);
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a busca:", error);
    }
  };

  return (
    <Autocomplete
      id={id}
      options={options}
      getOptionLabel={(option) => option.label}
      loading={loading}
      onChange={(e, value) => methods.setValue(name, value?.value)}
      noOptionsText={noOptionsText}
      isOptionEqualToValue={(option, value) =>
        option?.value?.value === value?.value?.value
      }
      loadingText="Carregando..."
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
          onClick={(e) =>
            setOptions(
              options.filter((option) =>
                option.label
                  .toLowerCase()
                  .includes(e.target?.value?.toString().toLowerCase())
              )
            )
          }
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CustomAutoComplete;

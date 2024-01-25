"use client";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const AutocompleteCustom = ({ id, label, name, getMethod, required }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const methods = useFormContext();

  useEffect(() => {
    updateOptions();
  }, [open]);

  const updateOptions = async () => {
    const newList = !open ? [] : (await getMethod()) ?? [];

    setOptions(newList);
  };

  const handleOnChange = (e, value) => {
    methods.setValue(name, value?.value ?? null);
  };

  return (
    <>
      <Autocomplete
        id={id}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={handleOnChange}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label={label}
              required={required}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? "Carregando..." : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          </>
        )}
      />
    </>
  );
};

export default AutocompleteCustom;

import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment, Stack, TextField, Typography } from "@mui/material"

export default function StreamersPageHeader(props: {
  channelNum: number
  handleSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchText: string
}) {
  const { channelNum, handleSearchTextChange, searchText } = props

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="center"
      marginX={{ sm: 1, xs: 0 }}
      mt={{ sm: 5, xs: 2 }}
      overflow="hidden"
      spacing={2}
    >
      <TextField
        color="secondary"
        fullWidth
        id="search-text-field"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        margin="normal"
        onChange={handleSearchTextChange}
        placeholder="search"
        size="small"
        sx={{
          marginY: 0,
        }}
        value={searchText}
        variant="standard"
      />
      <Typography
        color="secondary"
        minWidth={150}
        mr={2}
        textAlign="end"
        variant="h5"
      >
        {`${channelNum} channels`}
      </Typography>
    </Stack>
  )
}

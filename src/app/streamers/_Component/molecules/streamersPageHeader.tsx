import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment, Stack, TextField, Typography } from "@mui/material"

export default function StreamersPageHeader(props: {
  searchText: string
  handleSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  channelNum: number
}) {
  const { searchText, handleSearchTextChange, channelNum } = props

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      marginX={{ xs: 0, sm: 1 }}
      mt={{ xs: 2, sm: 5 }}
      overflow="hidden"
    >
      <TextField
        id="search-text-field"
        placeholder="search"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          disableUnderline: true
        }}
        fullWidth
        margin="normal"
        color="secondary"
        size="small"
        value={searchText}
        onChange={handleSearchTextChange}
        sx={{
          marginY: 0
        }}
      />
      <Typography
        mr={2}
        variant="h5"
        color="secondary"
        textAlign="end"
        minWidth={150}
      >
        {`${channelNum} channels`}
      </Typography>
    </Stack>
  )
}

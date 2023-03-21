import { Paper, styled, Typography } from "@mui/material";

export const BorderPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
}));

export const NoDecorationTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));
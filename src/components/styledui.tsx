import { Launch } from "@mui/icons-material";
import { AppBar, Paper, styled, Theme, Typography } from "@mui/material";

export const BorderPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    overflow: 'hidden',
}));

export const NoDecorationTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

export const SelectTypography = styled(Typography)(({ theme }) => ({
    transitionDuration: "0.3s",
    color: theme.palette.text.disabled,
    "&:hover": {
        color: theme.palette.text.primary,
    },
}));

export const StyledLaunch = styled(Launch)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

export const AboutBodyTypography = styled(Typography)(({ theme }) => ({
    variant: "body1",
    whiteSpace: "pre-line",
}));

type PaperAppBarProps = {
    isTransparent: boolean;
}
export const PaperAppBar = styled(AppBar)<PaperAppBarProps>(({ theme, isTransparent }) => {
    const backgroundColorDefault = theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.grey[900];
    const background = isTransparent ? "transparent" : backgroundColorDefault;

    return ({
        boxShadow: "none",
        transition:"background-color 0.3s",
        background: background,
    });
});


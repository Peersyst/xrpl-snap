import { Theme } from '@peersyst/react-components';
import { createGlobalStyle } from 'styled-components';
import './fonts.css';
import { ChipStyles } from './component/Chip.styles';
import { aStyles } from './component/a.styles';
import { AlertStyles } from './component/Alert.styles';
import { BlockchainAddressStyles } from './component/BlockchainAddress.styles';
import { PopoverStyles } from './component/Popover.styles';
import { DividerStyles } from './component/Divider.styles';
import { ToolbarStyles } from './component/Toolbar.styles';
import { rootStyles } from './component/root.styles';
import { CarouselStyles } from './component/Carousel.styles';
import { FormControlStyles } from './component/FormControl.styles';
import { LabelStyles } from './component/Label.styles';
import { SelectStyles } from './component/Select.styles';
import { TextInputStyles } from './component/TextInput.styles';
import { SwitchStyles } from './component/Switch.styles';
import { TabsStyles } from './component/Tabs.styles';
import { Expandablestyles } from './component/Expandable.styles';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font: inherit;
            vertical-align: baseline;
            scroll-behavior: smooth;
        }

        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block;
        }

        html {
            color: #121212;
            font-family: "Work Sans", sans-serif;
            font-size: clamp(14px, 1.5vw, 16px);
            overflow-y: scroll;
        }

        * {
            box-sizing: border-box;
            font-family: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: inherit;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }

        strong {
            font-weight: 500;
        }

        #root {
            min-height: 100vh;
        }

        ${rootStyles};
        ${aStyles};
        ${ChipStyles};
        ${BlockchainAddressStyles};
        ${AlertStyles};
        ${PopoverStyles};
        ${DividerStyles};
        ${ToolbarStyles};
        ${CarouselStyles};
        ${FormControlStyles};
        ${LabelStyles};
        ${SelectStyles};
        ${TextInputStyles};
        ${SwitchStyles};
        ${TabsStyles};
        ${Expandablestyles};
    `;

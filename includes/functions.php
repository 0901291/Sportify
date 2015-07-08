<?php
    function truncateText ($text) 
    {
        $tempText = $text;
        if (strlen($tempText) > 25) {
            return substr($text, 0, 25) . "...";
        }
        else {
            return $text;
        };
    }
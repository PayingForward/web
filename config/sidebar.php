<?php

return [

    "items" => [
        [
            "title" => "Countries",
            "id" => "country",
            "childrens" => [
                [
                    "title" => "Countries",
                    "id" => "country",
                    "link" => "/form/country",
                ],
                [
                    "title" => "State",
                    "id" => "state",
                    "link" => "/form/state",
                ],
                [
                    "title" => "Region",
                    "id" => 'region',
                    "link" => "/form/state",
                ],
                [
                    "title" => "Area",
                    "id" => "area",
                    "link" => "/form/area",
                ],
                [
                    "title" => "Town",
                    "id" => "town",
                    "link" => "/form/town",
                ],
            ],
        ],
        [
            "title" => "Users",
            "id" => "user",
            "childrens" => [
                [
                    "title" => "User Type",
                    "id" => "user_type",
                    "link" => "/form/user_type",
                ],
                [
                    "title" => "User",
                    "id" => "user",
                    "link" => "/form/user",
                ],
            ],
        ],
    ],
];

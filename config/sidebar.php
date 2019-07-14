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
                    "link" => "/cpanel/form/country",
                ],
                [
                    "title" => "State",
                    "id" => "state",
                    "link" => "/cpanel/form/state",
                ],
                [
                    "title" => "Region",
                    "id" => 'region',
                    "link" => "/cpanel/form/region",
                ],
                [
                    "title" => "Area",
                    "id" => "area",
                    "link" => "/cpanel/form/area",
                ],
                [
                    "title" => "Town",
                    "id" => "town",
                    "link" => "/cpanel/form/town",
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
                    "link" => "/cpanel/form/user_type",
                ],
                [
                    "title" => "User",
                    "id" => "user",
                    "link" => "/cpanel/form/user",
                ],
            ],
        ],
        [
            "title" => "Schools",
            "id" => "school",
            "childrens" => [
                [
                    "title" => "School",
                    "id" => "school",
                    "link" => "/cpanel/form/school",
                ],
                [
                    "title" => "Classes",
                    "id" => "school_class",
                    "link" => "/cpanel/form/school_class",
                ]
            ],
        ],
    ],
];

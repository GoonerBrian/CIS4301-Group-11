select a1.a1yr "Area 1 Year",
       a1.area1 "Area 1",
       a1.ratio1 "Area 1: tonnes/hectares",  
       a2.a2yr "Area 2 Year",
       a2.area2 "Area 2",
       a2.ratio2 "Area 2: tonnes/hectares"
from (
    select c1.area_name area1, c1.year a1yr, c1.value hectares, value_2 tonnes, c1.value/value_2 ratio1
    from crop_data c1
        inner join
            (select c2.year c2_yr, c2.area_name c2_country, c2.item_name, c2.unit unit_2, c2.value value_2
            from crop_data c2
            where c2.year between 1990 and 1999
            and c2.unit = 'ha'
            and c2.item_name = 'Apples'
            and c2.area_name = 'United States of America')
        on c1.year = c2_yr and c1.area_name = c2_country
    where c1.year between 1990 and 1999
    and c1.unit = 'tonnes'
    and c1.item_name = 'Apples'
    and c1.area_name = 'United States of America'
) a1
inner join (
    select c1.area_name area2, c1.year a2yr, c1.value hectares, value_2 tonnes, c1.value/value_2 ratio2
    from crop_data c1
        inner join
            (select c2.year c2_yr, c2.area_name c2_country, c2.item_name, c2.unit unit_2, c2.value value_2
            from crop_data c2
            where c2.year between 1990 and 1999
            and c2.unit = 'ha'
            and c2.item_name = 'Apples'
            and c2.area_name = 'Europe')
        on c1.year = c2_yr and c1.area_name = c2_country
    where c1.year between 1990 and 1999
    and c1.unit = 'tonnes'
    and c1.item_name = 'Apples'
    and c1.area_name = 'Europe'
) a2
on a1.a1yr = a2.a2yr


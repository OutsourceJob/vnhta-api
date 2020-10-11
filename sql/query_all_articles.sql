SELECT
	-- ARTICLE
	article.id, article.title, article.`status`, article.slug,
	article.vol, article.issue, article.number, article.year,
	article.start_page, article.end_page,
	article.journal_id, journal.fullName AS journal_name,
	author_id, author.fullName AS author_name,

	-- COST BENEFIT
	cost_benefit.pathology_id AS cost_benefit_pathology_id, 
	pathology.name AS cost_benefit_name,
	icd_20.code AS icd_20_code,
	intervention.name AS intervention_name,
	study_location.id AS study_location_id, study_location.name AS study_location_name,
	cost_benefit.study_design_id AS cost_benefit_study_design_id,
	cost_benefit.data_collecting_method_id AS cost_benefit_data_collecting_method_id,
	cost_benefit.sample_size_id AS cost_benefit_sample_size_id,
	cost_benefit.inclusion_criteria AS cost_benefit_inclusion_criteria,
	cost_benefit.exclusive_criteria AS cost_benefit_exclusive_criteria,
	cost_benefit.sampling_method_id AS cost_benefit_sampling_method_id,
	cost_benefit.start_sampling_time AS cost_benefit_start_sampling_time,
	cost_benefit.end_sampling_time AS cost_benefit_end_sampling_time,
	cost_benefit.cost_type_id AS cost_benefit_cost_type_id,
	cost_benefit.cost_component_id_array AS cost_benefit_cost_component_id_array,
	cost_benefit.currency_unit_id AS cost_benefit_currency_unit_id ,
	cost_benefit.year_of_cost AS cost_benefit_year_of_cost,
	cost_benefit.study_perspective_id_array AS cost_benefit_study_perspective_id_array,
	cost_benefit.qualitative_table_id AS cost_benefit_qualitative_table_id,
	cost_benefit.quantitative_table_id AS cost_benefit_quantitative_table_id,
	cost_benefit.cost_table_id AS cost_benefit_cost_table_id,
	cost_benefit.qualitative_factor_table_id AS cost_benefit_qualitative_factor_table_id,
	cost_benefit.quantitative_factor_table_id AS cost_benefit_quantitative_factor_table_id,
	
	-- ARTICLE
	cost_effectiveness.pathology_id AS cost_effectiveness_pathology_id,
	cea_icd_20.code AS cea_icd_20_code,
	cost_effectiveness.outcome_id_array AS cost_effectiveness_outcome_id_array,
	cost_effectiveness.ce_study_design_id AS cost_effectiveness_ce_study_design_id,
	cost_effectiveness.model_type_id_array AS cost_effectiveness_model_type_id_array,
	cost_effectiveness.modelStates AS cost_effectiveness_modelStates,
	cost_effectiveness.model_cycle_quantity AS cost_effectiveness_model_cycle_quantity,
	cost_effectiveness.model_cycle_unit_id AS cost_effectiveness_model_cycle_unit_id,
	cost_effectiveness.time_horizon_quantity AS cost_effectiveness_time_horizon_quantity,
	cost_effectiveness.time_horizon_unit_id AS cost_effectiveness_time_horizon_unit_id,
	cost_effectiveness.assumption AS cost_effectiveness_assumption,
	cost_effectiveness.analysis_method_id AS cost_effectiveness_analysis_method_id,
	cost_effectiveness.study_perspective_id_array AS cost_effectiveness_study_perspective_id_array,
	cost_effectiveness.type_of_effectiveness_id_array AS cost_effectiveness_type_of_effectiveness_id_array,
	cost_effectiveness.clinical_criteria AS cost_effectiveness_clinical_criteria,
	cost_effectiveness.effectiveness_data_collecting_method_id AS cost_effectiveness_effectiveness_data_collecting_method_id,
	cost_effectiveness.eff_discount_rate_id AS cost_effectiveness_discount_rate_id,
	cost_effectiveness.cost_component_id_array AS cost_effectiveness_cost_component_id_array,
	cost_effectiveness.cost_data_collecting_method AS cost_effectiveness_cost_data_collecting_method,
	cost_effectiveness.currency_unit_id AS cost_effectiveness_currency_unit_id,
	cost_effectiveness.year_of_cost AS cost_effectiveness_year_of_cost,
	cost_effectiveness.heterogeneity_analysis_id_array AS cost_effectiveness_heterogeneity_analysis_id_array,
	cost_effectiveness.uncertainty_analysis_result_id_array AS cost_effectiveness_uncertainty_analysis_result_id_array,
	cost_effectiveness.base_case_table_id AS cost_effectiveness_base_case_table_id,
	cost_effectiveness.sponsor AS cost_effectiveness_sponsor
FROM article
LEFT JOIN journal ON journal.id = article.journal_id
LEFT JOIN article_author ON article_author.article_id = article.id
LEFT JOIN author ON author.id = article_author.author_id
LEFT JOIN cost_benefit ON cost_benefit.article_id = article.id
LEFT JOIN cost_effectiveness ON cost_effectiveness.article_id = article.id
LEFT JOIN pathology ON pathology.id = cost_benefit.pathology_id
-- Cost - ICD20
LEFT JOIN cost_benefit_icd_20 ON cost_benefit_icd_20.cost_benefit_id = cost_benefit.id
LEFT JOIN icd_20 ON icd_20.id = cost_benefit_icd_20.icd_20_id
-- Cost - Intervention
LEFT JOIN cost_benefit_intervention ON cost_benefit_intervention.cost_benefit_id = cost_benefit.id
LEFT JOIN intervention ON intervention.id = cost_benefit_intervention.intervention_id
-- Cost - Study Location
LEFT JOIN cost_benefit_study_location ON cost_benefit_study_location.cost_benefit_id = cost_benefit.id
LEFT JOIN study_location ON study_location.id = cost_benefit_study_location.study_location_id

-- CEA - ICD20
LEFT JOIN cost_effectiveness_icd_20 ON cost_effectiveness_icd_20.cost_effectiveness_id = cost_effectiveness.id
LEFT JOIN icd_20 AS cea_icd_20 ON cea_icd_20.id = cost_effectiveness_icd_20.icd_20_id

-- CEA - Intervention
LEFT JOIN cost_effectiveness_intervention ON cost_effectiveness_intervention.cost_effectiveness_id = cost_effectiveness.id
LEFT JOIN intervention AS cea_intervention ON cea_intervention.id = cost_effectiveness_intervention.intervention_id

-- CEA - comparators
LEFT JOIN cost_effectiveness_comparator ON cost_effectiveness_comparator.cost_effectiveness_id = cost_effectiveness.id
LEFT JOIN comparator AS cea_comparator ON cea_comparator.id = cost_effectiveness_comparator.comparator_id
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import React, { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	setArticleState: (value: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const togglePanel = () => {
		setIsMenuOpen((prevOpen) => !prevOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: sidebarRef,
		onChange: (newValue) => {
			if (!newValue) {
				setIsMenuOpen(false);
			}
		},
	});

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(formSettings);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const updateSetting = (field: keyof ArticleStateType, value: OptionType) => {
		setFormSettings((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div>
			<ArrowButton isOpen={isMenuOpen} onClick={togglePanel} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => updateSetting('fontFamilyOption', option)}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={(option) => updateSetting('fontSizeOption', option)}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						selected={formSettings.fontColor}
						options={fontColors}
						onChange={(option) => updateSetting('fontColor', option)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formSettings.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateSetting('backgroundColor', option)}
					/>

					<Select
						title='Ширина контента'
						selected={formSettings.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateSetting('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

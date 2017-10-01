#!/usr/bin/env python
from setuptools import setup, find_packages


def readme():
    with open('README.rst') as f:
        return f.read()


if __name__ == '__main__':
    setup(
        name='mongostick',
        version='0.2',
        description='MongoStick helps you to poke around your database.',
        long_description=readme(),
        author="Roland von Ohlen",
        author_email="webwork@rvo.name",
        license='MIT',
        url='https://github.com/RockingRolli/mongostick',
        scripts=[],
        package_dir={'': 'src'},
        packages=find_packages('src'),
        py_modules=[],
        classifiers=[
            'Development Status :: 3 - Alpha',
            'Programming Language :: Python'
        ],
        entry_points={
            'console_scripts': [
                'mongostick=mongostick.app:main',
            ],
        },
        include_package_data=True,
        extras_require={
            'develop': [
            ]
        },
        setup_requires=[
        ],
        install_requires=[
            'motor==1.1',
            'tornado==4.5.2',
        ],
        dependency_links=[],
        zip_safe=True
    )
